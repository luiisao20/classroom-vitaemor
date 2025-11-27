import { useEffect, useState } from "react";
import type { QuestionWithOptions } from "../../core/interfaces";
import { useQuestions } from "../../presentation/exams/useQuestions";
import { useParams } from "react-router";

export const ModuleExamScreen = () => {
  const { examId } = useParams();
  const id = parseInt(examId!);
  const [questionsList, setQuestionsList] = useState<QuestionWithOptions[]>([]);

  const { questionsAdminQuery } = useQuestions(id);

  useEffect(() => {
    if (questionsAdminQuery.data) setQuestionsList(questionsAdminQuery.data);
  }, [questionsAdminQuery.data]);

  return (
    <div>
      {questionsList.map((item, index) => (
        <div key={index} className="px-6">
          {item.idType === 1 ? (
            <div className="flex flex-col space-y-4">
              <h2 className="font-semibold text-primary">
                {questionsList.findIndex((e) => e.id === item.id) + 1}.{" "}
                {item.text}
              </h2>
              {item.options.map((opt, subIndex) => (
                <div
                  key={index + subIndex}
                  className="flex items-center mb-4 px-4"
                >
                  <input
                    id={`question-${item.id}-option-${opt.id}`}
                    type="radio"
                    checked
                    // questionsList.some((e) => e.options === opt.id) ?? false
                    // onChange={() => handleSelectOption(item.id, opt)}
                    name={`question-${index}`}
                    value="USA"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-primary/30"
                  />
                  <label
                    htmlFor={`question-${item.id}-option-${opt.id}`}
                    className="block ms-2  text-sm font-medium"
                  >
                    {opt.text}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <label
                htmlFor={`answer-${item.id}`}
                className="font-semibold text-primary"
              >
                {questionsList.findIndex((e) => e.text === item.text) + 1}.{" "}
                {item.text}
              </label>
              <div className="mx-4">
                <textarea
                  value={
                    // answersExam.find((a) => a.idQuestion === item.id)?.text ??
                    ""
                  }
                  // onChange={(e) => handleWriteAnswer(item.id, e.target.value)}
                  id={`answer-${item.id}`}
                  rows={3}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary/60 focus:border-primary/60"
                  placeholder="Respuesta..."
                ></textarea>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
