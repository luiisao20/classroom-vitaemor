import { useEffect, useState } from "react";
import { useBooks } from "../presentation/books/useBooks";
import type { Book, BookPropertie } from "../core/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoSearchOutline } from "react-icons/io5";

export const LibraryScreen = () => {
  const [categories, setCategories] = useState<BookPropertie[]>([]);
  const [types, setTypes] = useState<BookPropertie[]>([]);
  const [bookList, setBookList] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState<{
    title: string;
    authors: string;
  }>({
    title: "",
    authors: "",
  });
  const [filterType, setFilterType] = useState<{
    type: number;
    category: number;
  }>({
    type: 0,
    category: 0,
  });

  const {
    bookCategoriesQuery,
    bookTypesQuery,
    booksQuery,
    nextPage,
    loadNextPage,
  } = useBooks(
    filterType.type,
    filterType.category,
    searchText.title,
    searchText.authors
  );

  useEffect(() => {
    if (booksQuery.data)
      setBookList(booksQuery.data.pages.flatMap((page) => page));
  }, [booksQuery.data]);

  useEffect(() => {
    if (bookCategoriesQuery.data) setCategories(bookCategoriesQuery.data);
  }, [bookCategoriesQuery.data]);

  useEffect(() => {
    if (bookTypesQuery.data) setTypes(bookTypesQuery.data);
  }, [bookTypesQuery.data]);

  const getBookType = (id: number): string =>
    types.find((t) => t.id === id)?.name!;

  const getBookCategory = (id: number): string =>
    categories.find((c) => c.id === id)?.name!;

  return (
    <div>
      <h2 className="text-center text-primary mt-6 mb-2 font-semibold text-xl">
        Biblioteca
      </h2>

      <div className="flex justify-around">
        <div className="mb-6">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline className="w-5 h-5 text-gray-500" />
            </div>
            <input
              value={searchText.title}
              onChange={(e) =>
                setSearchText((prev) => ({ ...prev, title: e.target.value }))
              }
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 border border-text-secondary/60 rounded-xl text-2xl text-gray-900 focus:ring-0 bg-gray-50 focus:outline-none"
              placeholder="Busca por título"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline className="w-5 h-5 text-gray-500" />
            </div>
            <input
              value={searchText.authors}
              onChange={(e) =>
                setSearchText((prev) => ({ ...prev, authors: e.target.value }))
              }
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 border border-text-secondary/60 rounded-xl text-2xl text-gray-900 focus:ring-0 bg-gray-50 focus:outline-none"
              placeholder="Busca por autores"
              required
            />
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-text-secondary mb-3">Filtrar por:</h2>

      <div className="flex justify-around mb-6">
        <select
          onChange={(e) =>
            setFilterType((prev) => ({
              ...prev,
              type: parseInt(e.target.value),
            }))
          }
          id="types"
          className="bg-gray-50 border border-gray-300 w-1/3 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-0 block p-2.5"
        >
          <option value="" selected disabled>
            Escoge un tipo:
          </option>
          <option value="0">Todos</option>
          {types.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) =>
            setFilterType((prev) => ({
              ...prev,
              category: parseInt(e.target.value),
            }))
          }
          id="types"
          className="bg-gray-50 border border-gray-300 w-1/3 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-0 block p-2.5"
        >
          <option value="" selected disabled>
            Escoge una categoría:
          </option>
          <option value="0">Todos</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <InfiniteScroll
        dataLength={bookList.length}
        next={loadNextPage}
        hasMore={!!nextPage}
        loader={<p>Cargando libros...</p>}
      >
        <div className="relative overflow-x-auto bg-modal shadow-xs rounded-xl border border-secondary">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-medium border-b  border-secondary">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Título
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  Autores
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  Tipo
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  Categoría
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-secondary hover:bg-secondary/10"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-xs"
                  >
                    {item.title}
                  </th>
                  <td className="px-3 py-4 text-xs">{item.authors}</td>
                  <td className="px-3 py-4">{getBookType(item.typeId)}</td>
                  <td className="px-3 py-4">
                    {getBookCategory(item.categoryId)}
                  </td>
                  <td className="px-3 py-4">
                    <a
                      href={item.url}
                      target="_blank"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Ir
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
    </div>
  );
};
