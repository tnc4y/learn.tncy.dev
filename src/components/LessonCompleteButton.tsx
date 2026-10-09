"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface LessonCompleteButtonProps {
  lessonId: string;
}

export default function LessonCompleteButton({ lessonId }: LessonCompleteButtonProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("completed_lessons");
      if (stored) {
        const list: string[] = JSON.parse(stored);
        setIsCompleted(list.includes(lessonId));
      }
    } catch {
      // localStorage erişim hatası olursa yok say
    }
  }, [lessonId]);

  const toggleComplete = () => {
    try {
      const stored = localStorage.getItem("completed_lessons");
      let list: string[] = stored ? JSON.parse(stored) : [];

      if (list.includes(lessonId)) {
        list = list.filter((id) => id !== lessonId);
        setIsCompleted(false);
      } else {
        list.push(lessonId);
        setIsCompleted(true);
      }

      localStorage.setItem("completed_lessons", JSON.stringify(list));
      window.dispatchEvent(new Event("learn_progress_updated"));
    } catch {
      // Hata durumunda
    }
  };

  return (
    <button
      onClick={toggleComplete}
      className={`btn btn-sm font-mono text-xs gap-1.5 transition-all ${
        isCompleted
          ? "btn-success shadow-xs"
          : "btn-outline border-base-content/20 hover:border-success hover:bg-success/10 hover:text-success"
      }`}
    >
      {isCompleted ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          <span>Ders Tamamlandı ✓</span>
        </>
      ) : (
        <>
          <Circle className="w-4 h-4 opacity-50" />
          <span>Dersi Tamamla</span>
        </>
      )}
    </button>
  );
}
