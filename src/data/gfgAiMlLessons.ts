import { LessonContent } from "./lessonsData";
import { DATA_SCIENCE_LESSONS } from "./dataScienceLessons";
import { MACHINE_LEARNING_LESSONS } from "./machineLearningLessons";
import { DEEP_LEARNING_LESSONS } from "./deepLearningLessons";
import { AI_GENAI_LESSONS } from "./aiGenAiLessons";

export const GFG_AIML_LESSONS: Record<string, LessonContent> = {
  ...DATA_SCIENCE_LESSONS,
  ...MACHINE_LEARNING_LESSONS,
  ...DEEP_LEARNING_LESSONS,
  ...AI_GENAI_LESSONS,
};
