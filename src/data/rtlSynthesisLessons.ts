import { LessonContent } from "./lessonsData";
import { RTL_SYNTHESIS_PART1 } from "./rtlSynthesisPart1";
import { RTL_SYNTHESIS_PART2 } from "./rtlSynthesisPart2";

export const RTL_SYNTHESIS_LESSONS: Record<string, LessonContent> = {
  ...RTL_SYNTHESIS_PART1,
  ...RTL_SYNTHESIS_PART2,
};
