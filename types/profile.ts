import { z } from "zod";

export const ProfileResumeSchema = z.object({
  summary: z.string(),
  highlights: z.array(z.string()),
  skills: z.array(z.string()),
  languages: z.array(
    z.object({
      language: z.string(),
      proficiency: z.string(),
    })
  ),
});

export type ProfileResume = z.infer<typeof ProfileResumeSchema>;
