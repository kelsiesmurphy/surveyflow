// convex/surveys.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Fetch all surveys
export const getAllSurveys = query({
  args: {},
  handler: async ({ db }) => {
    return await db.query("surveys").collect();
  },
});

// Create a survey session (respondent starts survey)
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

// Record an answer to a survey question
export const answerSurveyQuestion = mutation({
  args: {
    sessionId: v.id("survey_sessions"),
    questionId: v.id("survey_questions"),
    answer: v.any(), // Flexible: string, number, array, or object
    metadata: v.optional(v.any()), // optional extra info (device, location, etc.)
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

// Complete a survey session
export const completeSurvey = mutation({
  args: { sessionId: v.id("survey_sessions") },
  handler: async ({ db }, { sessionId }) => {
    await db.patch(sessionId, {
      completedAt: Date.now(),
    });
    return { sessionId };
  },
});

// Fetch a survey with its questions
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

// Fetch a session with answers and questions
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

// Fetch past sessions for a respondent (if logged in)
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
