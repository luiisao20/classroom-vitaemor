import { supabase } from "../../../../supabase";
import type { QuestionWithOptions } from "../../interfaces";

export const getQuestionsByExam = async (
  examId: number
): Promise<QuestionWithOptions[]> => {
  const questions: QuestionWithOptions[] = [];

  const { data, error } = await supabase.rpc("get_questions", {
    id_exam: examId,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    const { id, idType, options, question } = element;
    questions.push({
      id,
      idExam: examId,
      idType,
      options: options.map((opt: any) => ({
        text: opt.text,
        isCorrect: opt.isCorrect,
        id: opt.id,
      })),
      text: question,
    });
  }

  console.log(questions);
  

  return questions;
};
