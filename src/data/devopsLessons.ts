import { LessonContent } from "./lessonsData";
import { DEVOPS_PART1 } from "./devopsPart1";
import { DEVOPS_PART2 } from "./devopsPart2";

export const DEVOPS_LESSONS: Record<string, LessonContent> = {
  ...DEVOPS_PART1,
  ...DEVOPS_PART2,
};
