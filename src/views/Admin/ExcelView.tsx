import React, { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import type { Book } from "../../core/interfaces";
import { useBooks } from "../../presentation/books/useBooks";

export const ExcelUploader = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [booksList, setBooksList] = useState<Book[]>([]);

  const { booksMutation } = useBooks();
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    reader.onload = async (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.worksheets[0];

      // Obtenemos encabezados de la primera fila
      const headers: string[] = [];
      worksheet.getRow(1).eachCell((cell, colNumber) => {
        headers.push(cell.value?.toString() || `col${colNumber}`);
      });

      // Creamos array de objetos
      const data: any[] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // saltar encabezados
        const obj: any = {};
        row.eachCell((cell, colNumber) => {
          obj[headers[colNumber - 1]] = cell.value;
        });
        data.push(obj);
      });

      setRows(data);
    };

    reader.readAsArrayBuffer(file);
  };

  const getCategoryId = (text: string): number => {
    switch (text) {
      case "DUELO":
        return 1;
      case "TANATOLOGIA":
        return 2;
      default:
        return 3;
    }
  };

  const getTypeId = (text: string): number => {
    switch (text) {
      case "GUIA":
        return 1;
      case "TEXTO":
        return 2;
      default:
        return 3;
    }
  };

  const handleUpload = () => {
    setBooksList(
      rows.map((r) => ({
        title: r["TITULO"],
        authors: r["AUTOR"],
        categoryId: getCategoryId(r["CATEGORIA"]),
        typeId: getTypeId(r["TIPO"]),
        url: r["LINK"],
      }))
    );
  };

  useEffect(() => {
    if (booksList.length > 0) booksMutation.mutate(booksList);
  }, [booksList]);

  return (
    <div>
      
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="m-4 border border-black"
      />
      <ul>
        {rows.slice(0, 5).map((row, index) => (
          <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>

      <button
        onClick={() => handleUpload()}
        className="bg-secondary text-text-secondary p-4 rounded-xl cursor-pointer"
      >
        Subir
      </button>
    </div>
  );
};
