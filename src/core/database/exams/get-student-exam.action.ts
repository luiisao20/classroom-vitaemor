import { supabase } from "../../../../supabase";
import type { StudentAnswer } from "../../interfaces";

export const getStudentExam = async (
  userId: string,
  examId: number
): Promise<StudentAnswer[]> => {
  const response: StudentAnswer[] = []
  const {data, error} = await supabase.rpc("get_student_exam", {
    id_user: userId,
    id_exam: examId,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    response.push({
      idQuestion: element.id,
      question: element.question_text,
      answer: element.written_answer,
      optionSelected: element.option_text,
      isCorrect: element.is_correct,
      correctOption: element.correct_option,
      questionType: element.type_id,
      grade: element.grade,
    })
  }

  return response;
};
