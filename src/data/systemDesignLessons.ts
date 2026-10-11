import { LessonContent } from "./lessonsData";
import { SYSTEM_DESIGN_PART1 } from "./systemDesignPart1";
import { SYSTEM_DESIGN_PART2 } from "./systemDesignPart2";

export const SYSTEM_DESIGN_LESSONS: Record<string, LessonContent> = {
  ...SYSTEM_DESIGN_PART1,
  ...SYSTEM_DESIGN_PART2,
};
