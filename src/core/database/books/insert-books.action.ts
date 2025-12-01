import { supabase } from "../../../../supabase";
import type { Book } from "../../interfaces";

export const insertBooks = async (books: Book[]) => {
  const payload = books.map((b) => ({
    title: b.title,
    authors: b.authors,
    category_id: b.categoryId,
    type_id: b.typeId,
    url: b.url,
  }));

  const { error } = await supabase.from("books").insert(payload);

  if (error) throw new Error(error.message);
};
