import { LessonContent } from "./lessonsData";
import { SYSTEMVERILOG_PART1 } from "./systemverilogPart1";
import { SYSTEMVERILOG_PART2 } from "./systemverilogPart2";
import { SYSTEMVERILOG_PART3 } from "./systemverilogPart3";
import { SYSTEMVERILOG_PART4 } from "./systemverilogPart4";

export const SYSTEMVERILOG_LESSONS: Record<string, LessonContent> = {
  ...SYSTEMVERILOG_PART1,
  ...SYSTEMVERILOG_PART2,
  ...SYSTEMVERILOG_PART3,
  ...SYSTEMVERILOG_PART4,
};
