import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { Book } from "../../core/interfaces";
import { insertBooks } from "../../core/database/books/insert-books.action";
import { getBooks } from "../../core/database/books/get-books.action";
import {
  getBookTypes,
  getCategories,
} from "../../core/database/books/get-book-properties.action";
import {
  searchBooksByAuthors,
  searchBooksByTitle,
} from "../../core/database/books/search-books.action";

export const useBooks = (
  typeId?: number,
  categoryId?: number,
  title?: string,
  authors?: string
) => {
  const queryClient = useQueryClient();

  const booksQuery = useInfiniteQuery({
    queryKey: ["books", title, authors, typeId, categoryId],
    queryFn: ({ pageParam }) =>
      getBooks(typeId, categoryId, title, authors, 10, pageParam * 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length : undefined,
    staleTime: 1000 * 60 * 60,
  });

  const booksByTitleQuery = useQuery({
    queryKey: ["books", title],
    queryFn: () => searchBooksByTitle(title),
    staleTime: 1000 * 60 * 60,
  });

  const booksByAuthorsQuery = useQuery({
    queryKey: ["books", authors],
    queryFn: () => searchBooksByAuthors(authors),
    staleTime: 1000 * 60 * 60,
  });

  const bookTypesQuery = useQuery({
    queryFn: () => getBookTypes(),
    queryKey: ["bookTypes"],
    staleTime: 1000 * 60 * 60,
  });

  const bookCategoriesQuery = useQuery({
    queryFn: () => getCategories(),
    queryKey: ["bookCategories"],
    staleTime: 1000 * 60 * 60,
  });

  const booksMutation = useMutation({
    mutationFn: (books: Book[]) => insertBooks(books),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },

    onError: (error) => {
      alert(error);
    },
  });

  return {
    booksMutation,
    booksQuery,
    bookCategoriesQuery,
    bookTypesQuery,
    booksByTitleQuery,
    booksByAuthorsQuery,

    loadNextPage: booksQuery.fetchNextPage,
    nextPage: booksQuery.hasNextPage,
  };
};
