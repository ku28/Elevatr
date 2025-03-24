import * as z from "zod";

export const jobPosition = z
    .string()
    .trim()
    .min(2, { message: "Job position must be at least 2 characters long" })
    .max(100, { message: "Job position must not exceed 100 characters" });

export const jobDesc = z
    .string()
    .trim()
    .min(10, { message: "Job description must be at least 10 characters long" })
    .max(2000, { message: "Job description must not exceed 2000 characters" });

export const jobExperience = z
    .string()
    .trim()
    .min(1, { message: "Experience level is required" });

export const createdBy = z
    .string()
    .email({ message: "Invalid email address" });

export const createdAt = z
    .string()
    .min(1, { message: "Creation date is required" });

export const jsonMockResp = z
    .string()
    .min(2, { message: "Mock response JSON must be valid" });

export const mockId = z
    .string()
    .uuid({ message: "Invalid mock interview ID" });

export const mockInterviewValidationSchema = z.object({
    mockId,
    jsonMockResp,
    jobPosition,
    jobDesc,
    jobExperience,
    createdBy,
    createdAt,
});

export const question = z
    .string()
    .trim()
    .min(5, { message: "Question must be at least 5 characters long" });

export const correctAns = z.string().optional();

export const userAns = z.string().optional();

export const feedback = z
    .string()
    .trim()
    .min(5, { message: "Feedback must be at least 5 characters long" })
    .max(1000, { message: "Feedback must not exceed 1000 characters" })
    .optional();

export const rating = z
    .string()
    .min(1, { message: "Rating must be at least 1" });

export const userEmail = z
    .string()
    .email({ message: "Invalid email address" });

export const userAnswerValidationSchema = z.object({
    mockIdRef: mockId,
    question,
    correctAns,
    userAns,
    feedback,
    rating,
    userEmail,
    createdAt,
});
