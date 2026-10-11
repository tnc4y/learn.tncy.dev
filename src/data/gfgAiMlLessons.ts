import { LessonContent } from "./lessonsData";
import { GFG_AIML_PART1 } from "./gfgAiMlPart1";
import { GFG_AIML_PART2 } from "./gfgAiMlPart2";

export const GFG_AIML_LESSONS: Record<string, LessonContent> = {
  ...GFG_AIML_PART1,
  ...GFG_AIML_PART2,
};
