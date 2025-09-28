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
      description: "A sample NPS-style survey.",
      coverImageStorageId: "kg227qszdv53kwavzka2tr58797rfcrt",
      coverImageAlt: "Building exterior",
      createdBy,
      questionIds: [],
      createdAt,
      isActive: true,
    });

    const questions = [
      {
        surveyId,
        title: "How did you hear about us?",
        subtitle: "Select one option",
        type: "multiple_choice",
        order: 1,
        options: [
          {
            label: "Google",
            iconStorageId: "kg29jt4ch4ac0j66q8jgmvbdes7rf9z2",
          },
          {
            label: "YouTube",
            iconStorageId: "kg2emsf6cqkc34n6pgpm62zqqd7rfm7f",
          },
          {
            label: "Social Media",
            iconStorageId: "kg242g5yf55yt9thyfvj8qzh657rev9f",
          },
          {
            label: "Other",
            iconStorageId: "kg2dk1wcdrwtjznzwzfh0fmgax7rftpp",
            hasOther: true,
          },
        ],
      },
      {
        surveyId,
        title: "Can you share more details?",
        subtitle: "For example, which video or channel on YouTube?",
        type: "text",
        order: 2,
      },
      {
        surveyId,
        title: "What is appealing about our company?",
        subtitle: "Select as many options as you like",
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
        title: "When did you first hear about us?",
        subtitle: "Select one option",
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
        title: "Who is this purchase for?",
        subtitle: "Select one option",
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
        title: "How likely are you to recommend us to a friend?",
        type: "rating",
        order: 6,
        metadata: { scale: 10 }, // NPS-style 0–10 scale
      },
      {
        surveyId,
        title: "Thank you for your time!",
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
