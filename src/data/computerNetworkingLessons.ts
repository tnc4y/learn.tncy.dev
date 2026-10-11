import { LessonContent } from "./lessonsData";
import { COMPUTER_NETWORKING_PART1 } from "./computerNetworkingPart1";
import { COMPUTER_NETWORKING_PART2 } from "./computerNetworkingPart2";

export const COMPUTER_NETWORKING_LESSONS: Record<string, LessonContent> = {
  ...COMPUTER_NETWORKING_PART1,
  ...COMPUTER_NETWORKING_PART2,
};
