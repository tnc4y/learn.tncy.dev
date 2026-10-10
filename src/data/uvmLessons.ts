import { LessonContent } from "./lessonsData";
import { UVM_PART1 } from "./uvmPart1";
import { UVM_PART2 } from "./uvmPart2";
import { UVM_PART3 } from "./uvmPart3";
import { UVM_PART4 } from "./uvmPart4";

export const UVM_LESSONS: Record<string, LessonContent> = {
  ...UVM_PART1,
  ...UVM_PART2,
  ...UVM_PART3,
  ...UVM_PART4,
};
