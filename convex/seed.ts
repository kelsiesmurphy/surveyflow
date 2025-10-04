import { mutation } from "./_generated/server";

export const seedNpsSurvey = mutation({
  args: {},
  handler: async ({ db }) => {
    const createdBy = "system";
    const createdAt = Date.now();

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
        metadata: { scale: 10 },
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

    await db.patch(surveyId, { questionIds });

    return { surveyId, questions: questionIds.length };
  },
});

export const seedPostPurchaseSurvey = mutation({
  args: {},
  handler: async ({ db }) => {
    const createdBy = "system";
    const createdAt = Date.now();

    const surveyId = await db.insert("surveys", {
      title: "Post-Purchase Satisfaction Survey",
      description: "Understand how customers feel after their recent purchase.",
      coverImageStorageId: "kg3x2g4f9p2t1jz7t5v8hrf9a7rfzqxs",
      coverImageAlt: "Happy customer holding a product box",
      createdBy,
      questionIds: [],
      createdAt,
      isActive: true,
    });

    const questions = [
      {
        surveyId,
        title: "How satisfied are you with your recent purchase?",
        subtitle: "Rate your satisfaction from 1 to 5",
        type: "rating",
        order: 1,
        metadata: { scale: 5 },
      },
      {
        surveyId,
        title: "Which product did you purchase?",
        subtitle: "Select one option",
        type: "multiple_choice",
        order: 2,
        options: [
          { label: "Physical product" },
          { label: "Digital download" },
          { label: "Subscription plan" },
          { label: "Gift card" },
        ],
      },
      {
        surveyId,
        title: "What made you choose us?",
        subtitle: "Select all that apply",
        type: "multiple_choice",
        order: 3,
        options: [
          { label: "Price" },
          { label: "Product quality" },
          { label: "Customer service" },
          { label: "Brand reputation" },
          { label: "Other", hasOther: true },
        ],
      },
      {
        surveyId,
        title: "Did your order arrive on time?",
        subtitle: "Select one option",
        type: "multiple_choice",
        order: 4,
        options: [
          { label: "Yes, earlier than expected" },
          { label: "Yes, on time" },
          { label: "No, it was delayed" },
        ],
      },
      {
        surveyId,
        title: "How easy was the checkout process?",
        subtitle: "Select one option",
        type: "multiple_choice",
        order: 5,
        options: [
          { label: "Very easy" },
          { label: "Somewhat easy" },
          { label: "Neutral" },
          { label: "Somewhat difficult" },
          { label: "Very difficult" },
        ],
      },
      {
        surveyId,
        title: "Would you purchase from us again?",
        subtitle: "Select one option",
        type: "multiple_choice",
        order: 6,
        options: [
          { label: "Definitely" },
          { label: "Probably" },
          { label: "Not sure" },
          { label: "Probably not" },
          { label: "Definitely not" },
        ],
      },
      {
        surveyId,
        title: "What could we do to improve your experience?",
        subtitle: "Your honest feedback helps us get better.",
        type: "text",
        order: 7,
      },
      {
        surveyId,
        title: "Thank you for your feedback!",
        subtitle: "We truly appreciate your time.",
        type: "thank_you",
        order: 8,
      },
    ];

    const questionIds: any[] = [];
    for (const q of questions) {
      const id = await db.insert("survey_questions", q);
      questionIds.push(id);
    }

    await db.patch(surveyId, { questionIds });

    return { surveyId, questions: questionIds.length };
  },
});
