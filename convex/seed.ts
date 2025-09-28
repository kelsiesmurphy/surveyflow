// convex/seed.ts
import { mutation } from "./_generated/server";

export const seedNpsSurvey = mutation({
  args: {},
  handler: async ({ db }) => {
    const createdBy = "system"; // could be a placeholder or admin user
    const createdAt = Date.now();

    // Insert survey first (will patch in question IDs later)
    const surveyId = await db.insert("surveys", {
      title: "Customer Feedback Survey",
      description: "A sample NPS-style survey to get started.",
      createdBy,
      questionIds: [],
      createdAt,
      isActive: true,
    });

    const questions = [
      {
        surveyId,
        text: "How did you hear about us?",
        type: "multiple_choice",
        order: 1,
        options: [
          { label: "Google", iconUrl: "/icons/google.png" },
          { label: "YouTube", iconUrl: "/icons/youtube.png" },
          { label: "Social Media", iconUrl: "/icons/social.png" },
          { label: "Other", hasOther: true },
        ],
      },
      {
        surveyId,
        text: "Can you share more details? (e.g. which video or channel on YouTube?)",
        type: "text",
        order: 2,
      },
      {
        surveyId,
        text: "What’s most appealing about our company?",
        type: "multiple_choice",
        order: 3,
        options: [
          { label: "Our mission" },
          { label: "Our values" },
          { label: "Our products" },
          { label: "Other", hasOther: true },
        ],
      },
      {
        surveyId,
        text: "When did you first hear about us?",
        type: "multiple_choice",
        order: 4,
        options: [
          { label: "Less than a month ago" },
          { label: "1-6 months ago" },
          { label: "6-12 months ago" },
          { label: "Over a year ago" },
        ],
      },
      {
        surveyId,
        text: "Who is this purchase for?",
        type: "multiple_choice",
        order: 5,
        options: [
          { label: "Myself" },
          { label: "A friend or family member" },
          { label: "My team or company" },
          { label: "Other", hasOther: true },
        ],
      },
      {
        surveyId,
        text: "How likely are you to recommend us to a friend?",
        type: "rating",
        order: 6,
        metadata: { scale: 10 }, // NPS-style 0–10 scale
      },
      {
        surveyId,
        text: "Thank you for your time!",
        type: "thank_you",
        order: 7,
      },
    ];

    const questionIds = [];
    for (const q of questions) {
      const id = await db.insert("survey_questions", q);
      questionIds.push(id);
    }

    // Update survey with its question IDs
    await db.patch(surveyId, { questionIds });

    return { surveyId, questions: questionIds.length };
  },
});
