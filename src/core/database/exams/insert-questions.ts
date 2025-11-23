import { supabase } from "../../../../supabase";
import type { Question, QuestionWithOptions } from "../../interfaces";

export const insertSimpleQuestion = async (question: Question) => {
  const { error } = await supabase.from("questions").insert({
    text: question.text,
    exam_id: question.idExam,
    type_id: question.idType,
  });

  if (error) throw new Error(error.message);
};

export const insertQuestionWithOptions = async (
  question: QuestionWithOptions
) => {
  const { idExam, idType, options, text } = question;

  const { data, error } = await supabase
    .from("questions")
    .insert({
      text: text,
      exam_id: idExam,
      type_id: idType,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  const optionsToInsert = options.map((opt) => ({
    text: opt.text,
    is_correct: opt.isCorrect,
    question_id: data.id,
  }));

  const { error: errorOpt } = await supabase
    .from("options")
    .insert(optionsToInsert);

  if (errorOpt) throw new Error(errorOpt.message);
};
