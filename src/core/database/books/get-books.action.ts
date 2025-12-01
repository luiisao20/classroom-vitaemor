import { supabase } from "../../../../supabase";
import type { Book } from "../../interfaces";

export const getBooks = async (
  typeId?: number,
  categoryId?: number,
  title?: string,
  authors?: string,
  limit = 10,
  offset = 0
): Promise<Book[]> => {
  const books: Book[] = [];

  let query = supabase
    .from("books")
    .select()
    .ilike("title", `%${title}%`)
    .ilike("authors", `%${authors}%`);

  if (typeId !== 0) query = query.eq("type_id", typeId);

  if (categoryId !== 0) query = query.eq("category_id", categoryId);

  const { data, error } = await query.range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);

  for (const element of data) {
    books.push({
      id: element.id,
      title: element.title,
      authors: element.authors,
      categoryId: element.category_id,
      typeId: element.type_id,
      url: element.url,
    });
  }

  return books;
};
