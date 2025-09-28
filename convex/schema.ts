// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Individual questions or steps in a survey
  survey_questions: defineTable({
    surveyId: v.id("surveys"),
    title: v.optional(v.string()), // Question title (or null for welcome/thank-you screens)
    subtitle: v.optional(v.string()), // Question subtitle (or null for welcome/thank-you screens)
    type: v.string(), // "multiple_choice" | "text" | "rating" | "welcome" | "thank_you"
    options: v.optional(
      v.array(
        v.object({
          label: v.string(), // Option label ("Google", "YouTube", etc.)
          iconStorageId: v.optional(v.string()), // Optional image/icon for the choice
          hasOther: v.optional(v.boolean()), // Supports an "Other" textbox
        })
      )
    ),
    metadata: v.optional(v.any()), // Extra config (min/max rating, placeholders, etc.)
    order: v.number(), // Ordering of steps in the survey
  }),

  // Survey definition
  surveys: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    coverImageStorageId: v.optional(v.string()),
    coverImageAlt: v.optional(v.string()),
    createdBy: v.string(), // userId
    questionIds: v.array(v.id("survey_questions")),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    isActive: v.boolean(),
  }),

  // Survey session per respondent
  survey_sessions: defineTable({
    surveyId: v.id("surveys"),
    respondentId: v.optional(v.string()), // could be anonymous or linked to a user
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
    metadata: v.optional(v.any()), // e.g. device info, referral source
  }),

  // Individual responses to questions
  survey_answers: defineTable({
    sessionId: v.id("survey_sessions"),
    questionId: v.id("survey_questions"),
    answer: v.any(), // Flexible: string, number, array, or object depending on type
    answeredAt: v.number(),
    metadata: v.optional(v.any()),
  }).index("by_session", ["sessionId"]),
});
