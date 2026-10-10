import { LessonContent } from "./lessonsData";
import { DIGITAL_FUNDAMENTALS_PART1 } from "./digitalFundamentalsPart1";
import { DIGITAL_FUNDAMENTALS_PART2 } from "./digitalFundamentalsPart2";
import { DIGITAL_FUNDAMENTALS_PART3 } from "./digitalFundamentalsPart3";
import { DIGITAL_FUNDAMENTALS_PART4 } from "./digitalFundamentalsPart4";

export const DIGITAL_FUNDAMENTALS_LESSONS: Record<string, LessonContent> = {
  ...DIGITAL_FUNDAMENTALS_PART1,
  ...DIGITAL_FUNDAMENTALS_PART2,
  ...DIGITAL_FUNDAMENTALS_PART3,
  ...DIGITAL_FUNDAMENTALS_PART4,
};
