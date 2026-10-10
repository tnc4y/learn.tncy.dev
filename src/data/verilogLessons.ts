import { LessonContent } from "./lessonsData";
import { VERILOG_PART1 } from "./verilogPart1";
import { VERILOG_PART2 } from "./verilogPart2";
import { VERILOG_PART3 } from "./verilogPart3";
import { VERILOG_PART4 } from "./verilogPart4";
import { VERILOG_PART5 } from "./verilogPart5";

export const VERILOG_LESSONS: Record<string, LessonContent> = {
  ...VERILOG_PART1,
  ...VERILOG_PART2,
  ...VERILOG_PART3,
  ...VERILOG_PART4,
  ...VERILOG_PART5,
};
