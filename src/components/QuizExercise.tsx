"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from "lucide-react";

export interface QuizQuestion {
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizExerciseProps {
  quiz: QuizQuestion;
}

export default function QuizExercise({ quiz }: QuizExerciseProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === quiz.correctIndex;

  const handleSubmit = () => {
    if (selected !== null) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="card bg-base-200/70 border border-base-300 shadow-sm my-8 overflow-hidden">
      <div className="card-body p-5">
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Kendini Test Et (Alıştırma)</span>
        </div>

        <h3 className="text-base font-semibold text-base-content mt-1">
          {quiz.question}
        </h3>

        {quiz.codeSnippet && (
          <div className="bg-[#1e1e2e] text-[#cdd6f4] p-3 rounded-lg font-mono text-xs my-2 overflow-x-auto border border-white/5">
            <pre>{quiz.codeSnippet}</pre>
          </div>
        )}

        <div className="space-y-2 my-2">
          {quiz.options.map((opt, idx) => {
            const isThisSelected = selected === idx;
            let optStyle = "hover:bg-base-300 border-base-content/10 bg-base-100";

            if (submitted) {
              if (idx === quiz.correctIndex) {
                optStyle = "bg-success/20 border-success text-success font-semibold";
              } else if (isThisSelected && !isCorrect) {
                optStyle = "bg-error/20 border-error text-error";
              } else {
                optStyle = "opacity-50 border-base-content/10 bg-base-100";
              }
            } else if (isThisSelected) {
              optStyle = "bg-primary/10 border-primary text-primary font-semibold shadow-xs";
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => setSelected(idx)}
                className={`w-full text-left p-3 rounded-lg text-xs sm:text-sm border transition-all flex items-center justify-between ${optStyle}`}
              >
                <span>{opt}</span>
                {submitted && idx === quiz.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                )}
                {submitted && isThisSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-error shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <div className="card-actions justify-end mt-2">
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="btn btn-primary btn-sm gap-1 text-xs"
            >
              <span>Cevabı Kontrol Et</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="mt-3 p-3 rounded-lg bg-base-100 border border-base-300 space-y-2">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="badge badge-success gap-1 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Tebrikler! Doğru Cevap
                </span>
              ) : (
                <span className="badge badge-error gap-1 text-xs font-bold">
                  <XCircle className="w-3.5 h-3.5" /> Yanlış Cevap
                </span>
              )}
            </div>
            <p className="text-xs text-base-content/80 leading-relaxed">
              {quiz.explanation}
            </p>
            <div className="text-right">
              <button onClick={handleReset} className="btn btn-ghost btn-xs text-xs">
                Yeniden Dene
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
