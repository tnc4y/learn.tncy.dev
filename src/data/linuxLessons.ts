import { LessonContent } from "./lessonsData";
import { LINUX_PART1 } from "./linuxPart1";
import { LINUX_PART2 } from "./linuxPart2";

export const LINUX_LESSONS: Record<string, LessonContent> = {
  ...LINUX_PART1,
  ...LINUX_PART2,
};
