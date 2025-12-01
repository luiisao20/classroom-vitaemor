import { supabase } from "../../../../supabase";
import type { BookPropertie } from "../../interfaces";

export const getCategories = async (): Promise<BookPropertie[]> => {
  const categories: BookPropertie[] = [];

  const { data, error } = await supabase.from("categories").select();

  if (error) throw new Error(error.message);

  for (const element of data) {
    categories.push({
      id: element.id,
      name: element.name,
    });
  }

  return categories;
};

export const getBookTypes = async (): Promise<BookPropertie[]> => {
  const types: BookPropertie[] = [];

  const { data, error } = await supabase.from("book_types").select();

  if (error) throw new Error(error.message);

  for (const element of data) {
    types.push({
      id: element.id,
      name: element.name,
    });
  }

  return types;
};
