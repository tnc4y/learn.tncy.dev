"use client";

import { useEffect } from "react";

interface LessonTrackerProps {
  lessonId: string;
}

export default function LessonTracker({ lessonId }: LessonTrackerProps) {
  useEffect(() => {
    try {
      localStorage.setItem("last_opened_lesson", lessonId);
      window.dispatchEvent(new Event("learn_progress_updated"));
    } catch {
      // LocalStorage error handling
    }
  }, [lessonId]);

  return null;
}
