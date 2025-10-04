import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllSurveys = query({
  args: {},
  handler: async ({ db }) => {
    return await db.query("surveys").collect();
  },
});

export const startSurvey = mutation({
  args: { surveyId: v.id("surveys"), respondentId: v.optional(v.string()) },
  handler: async ({ db }, { surveyId, respondentId }) => {
    const sessionId = await db.insert("survey_sessions", {
      surveyId,
      respondentId,
      startedAt: Date.now(),
    });
    return sessionId;
  },
});

export const answerSurveyQuestion = mutation({
  args: {
    sessionId: v.id("survey_sessions"),
    questionId: v.id("survey_questions"),
    answer: v.any(),
    metadata: v.optional(v.any()),
  },
  handler: async ({ db }, { sessionId, questionId, answer, metadata }) => {
    const question = await db.get(questionId);
    if (!question) throw new Error("Question not found");

    return await db.insert("survey_answers", {
      sessionId,
      questionId,
      answer,
      answeredAt: Date.now(),
      metadata,
    });
  },
});

export const completeSurvey = mutation({
  args: { sessionId: v.id("survey_sessions") },
  handler: async ({ db }, { sessionId }) => {
    await db.patch(sessionId, {
      completedAt: Date.now(),
    });
    return { sessionId };
  },
});

export const getSurveyWithQuestions = query({
  args: { surveyId: v.id("surveys") },
  handler: async ({ db }, { surveyId }) => {
    const survey = await db.get(surveyId);
    if (!survey) return null;

    const questions = await Promise.all(
      survey.questionIds.map((id) => db.get(id))
    );

    return { ...survey, questions };
  },
});

export const getSessionWithAnswers = query({
  args: { sessionId: v.id("survey_sessions") },
  handler: async ({ db }, { sessionId }) => {
    const session = await db.get(sessionId);
    if (!session) return null;

    const answers = await db
      .query("survey_answers")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    const answersWithQ = await Promise.all(
      answers.map(async (a) => ({
        ...a,
        question: await db.get(a.questionId),
      }))
    );

    return { ...session, answers: answersWithQ };
  },
});

export const getUserSurveySessions = query({
  args: { respondentId: v.string() },
  handler: async ({ db }, { respondentId }) => {
    return await db
      .query("survey_sessions")
      .filter((q) => q.eq(q.field("respondentId"), respondentId))
      .order("desc")
      .collect();
  },
});



export const getSurveySessionsReport = query({
  args: { surveyId: v.id("surveys") },
  handler: async ({ db }, { surveyId }) => {
    const survey = await db.get(surveyId);
    if (!survey) return null;

    const sessions = await db
      .query("survey_sessions")
      .withIndex("by_survey", (q) => q.eq("surveyId", surveyId))
      .collect();

    let completedCount = 0;

    const sessionsWithAnswers = await Promise.all(
      sessions.map(async (session) => {
        const answers = await db
          .query("survey_answers")
          .withIndex("by_session", (q) => q.eq("sessionId", session._id))
          .collect();

        const isCompleted = !!session.completedAt;
        if (isCompleted) completedCount++;

        return {
          sessionId: session._id,
          respondentId: session.respondentId ?? "Anonymous",
          startedAt: session.startedAt,
          completedAt: session.completedAt ?? null,
          status: isCompleted ? "Completed" : "Abandoned",
          answersCount: answers.length,
        };
      })
    );

    const total = sessions.length;
    const completionRate = total > 0 ? (completedCount / total) * 100 : 0;

    return {
      survey: {
        _id: survey._id,
        title: survey.title,
        description: survey.description,
      },
      stats: {
        totalSessions: total,
        completedCount,
        abandonedCount: total - completedCount,
        completionRate,
      },
      sessions: sessionsWithAnswers,
    };
  },
});
