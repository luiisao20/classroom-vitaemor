import { supabase } from "../../../../supabase";
import type { Book } from "../../interfaces";

export const searchBooksByTitle = async (title?: string): Promise<Book[]> => {
  const books: Book[] = [];

  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("title", title);

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

export const searchBooksByAuthors = async (title?: string): Promise<Book[]> => {
  const books: Book[] = [];

  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("authors", title);

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
