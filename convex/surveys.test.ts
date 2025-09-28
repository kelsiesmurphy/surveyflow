import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";
import { modules } from "./test.setup";

async function seedSurvey(t: ReturnType<typeof convexTest>) {
  const q1 = await t.run(({ db }) =>
    db.insert("survey_questions", {
      surveyId: "temp" as any, // placeholder until survey is created
      text: "How did you hear about us?",
      type: "multiple_choice",
      options: [
        { label: "Google", iconUrl: "google.png" },
        { label: "YouTube", iconUrl: "youtube.png" },
        { label: "Other", hasOther: true },
      ],
      order: 1,
    })
  );

  const q2 = await t.run(({ db }) =>
    db.insert("survey_questions", {
      surveyId: "temp" as any,
      text: "Would you recommend us to a friend?",
      type: "rating",
      metadata: { scale: 10 }, // NPS style
      order: 2,
    })
  );

  const survey = await t.run(({ db }) =>
    db.insert("surveys", {
      title: "Test Survey",
      description: "Testing onboarding survey",
      createdBy: "user123",
      questionIds: [q1, q2],
      createdAt: Date.now(),
      isActive: true,
    })
  );

  // Patch the questions with the real surveyId
  await t.run(({ db }) => db.patch(q1, { surveyId: survey }));
  await t.run(({ db }) => db.patch(q2, { surveyId: survey }));

  return { survey, questions: [q1, q2] };
}

test("start a survey session", async () => {
  const t = convexTest(schema, modules);
  const { survey } = await seedSurvey(t);

  const sessionId = await t.mutation(api.surveys.startSurvey, {
    surveyId: survey,
    respondentId: "resp123",
  });

  const session = await t.run(({ db }) => db.get(sessionId));
  expect(session).toMatchObject({
    respondentId: "resp123",
    surveyId: survey,
  });
});

test("answer questions and complete session", async () => {
  const t = convexTest(schema, modules);
  const { survey, questions } = await seedSurvey(t);

  const sessionId = await t.mutation(api.surveys.startSurvey, {
    surveyId: survey,
    respondentId: "resp123",
  });

  // Answer first question
  await t.mutation(api.surveys.answerSurveyQuestion, {
    sessionId,
    questionId: questions[0],
    answer: "Google",
  });

  // Answer second question
  await t.mutation(api.surveys.answerSurveyQuestion, {
    sessionId,
    questionId: questions[1],
    answer: 9, // NPS score
  });

  const result = await t.mutation(api.surveys.completeSurvey, {
    sessionId,
  });

  expect(result.sessionId).toBe(sessionId);

  const session = await t.run(({ db }) => db.get(sessionId));
  expect(session?.completedAt).toBeTypeOf("number");
});

test("get survey with questions", async () => {
  const t = convexTest(schema, modules);
  const { survey, questions } = await seedSurvey(t);

  const fullSurvey = await t.query(api.surveys.getSurveyWithQuestions, {
    surveyId: survey,
  });

  expect(fullSurvey?.title).toBe("Test Survey");
  expect(fullSurvey?.questions.map((q) => q?._id)).toEqual(questions);
});

test("get session with answers", async () => {
  const t = convexTest(schema, modules);
  const { survey, questions } = await seedSurvey(t);

  const sessionId = await t.mutation(api.surveys.startSurvey, {
    surveyId: survey,
    respondentId: "resp123",
  });

  await t.mutation(api.surveys.answerSurveyQuestion, {
    sessionId,
    questionId: questions[0],
    answer: "Google",
  });

  const session = await t.query(api.surveys.getSessionWithAnswers, {
    sessionId,
  });

  expect(session?.answers.length).toBe(1);
  expect(session?.answers[0].question?.title).toContain("hear about us");
});

test("get user survey sessions", async () => {
  const t = convexTest(schema, modules);
  const { survey } = await seedSurvey(t);

  await t.mutation(api.surveys.startSurvey, {
    surveyId: survey,
    respondentId: "resp123",
  });

  const sessions = await t.query(api.surveys.getUserSurveySessions, {
    respondentId: "resp123",
  });

  expect(sessions.length).toBe(1);
  expect(sessions[0].respondentId).toBe("resp123");
});
