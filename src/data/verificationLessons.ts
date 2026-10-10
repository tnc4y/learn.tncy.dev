import { LessonContent } from "./lessonsData";
import { VERIFICATION_PART1 } from "./verificationPart1";
import { VERIFICATION_PART2 } from "./verificationPart2";

export const VERIFICATION_LESSONS: Record<string, LessonContent> = {
  ...VERIFICATION_PART1,
  ...VERIFICATION_PART2,
};
