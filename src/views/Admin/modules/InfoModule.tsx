import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CiTextAlignLeft } from "react-icons/ci";
import { LuTableOfContents } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineKeyboardArrowDown, MdDeleteForever } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa6";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import { Colors } from "../../../assets/colors";
import { InputComponent } from "../../../components/input/InputComponent";
import type { AdditionalContent, Bibliography } from "../../../core/interfaces";
import { useAdditionalContent } from "../../../presentation/modules/useAdditionalContent";
import { useOneModule } from "../../../presentation/modules/useOneModule";
import { useBibliography } from "../../../presentation/modules/useBibliography";

export const InfoModule = () => {
  const { id } = useParams();
  const moduleId = parseInt(`${id}`);
  const [resume, setResume] = useState<string>();
  const [bibliography, setBibliography] = useState<string>();
  const [additionalContent, setAdditionalContent] = useState<AdditionalContent>(
    { topic: "", url: "", moduleId: moduleId }
  );
  const [contentList, setContentList] = useState<AdditionalContent[]>([]);
  const [bibliographyList, setBibliographyList] = useState<Bibliography[]>([]);

  const { moduleQuery, moduleResumeMutation } = useOneModule(moduleId);
  const { additionalDeleteMutation, additionalMutation, additionalQuery } =
    useAdditionalContent(moduleId);
  const {
    bibliographyDeleteMutation,
    bibliographyMutation,
    bibliographyQuery,
  } = useBibliography(moduleId);

  useEffect(() => {
    if (additionalQuery.data) setContentList(additionalQuery.data);
  }, [additionalQuery.data]);

  useEffect(() => {
    if (moduleQuery.data) setResume(moduleQuery.data.resume ?? "");
  }, [moduleQuery.data]);

  useEffect(() => {
    if (bibliographyQuery.data) setBibliographyList(bibliographyQuery.data);
  }, [bibliographyQuery.data]);

  return (
    <div className="mt-8">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <MdOutlineKeyboardArrowDown size={30} color={Colors.primary} />
          }
          aria-controls="resumen"
          id="resumen"
        >
          <div className="flex gap-4 text-text-secondary text-xl items-center">
            <CiTextAlignLeft />
            <p className="font-semibold">Resumen</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div className="py-5 border-b border-gray-200">
              <div className="px-4 py-2 bg-white rounded-t-lg">
                <textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  id="resume"
                  rows={6}
                  className="w-full px-0 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-transparent"
                  placeholder="Ingresa un resumen de la conferencia"
                ></textarea>
              </div>
              <div className="flex items-center justify-end px-3 py-2 border-t">
                <button
                  disabled={moduleResumeMutation.isPending}
                  onClick={() => moduleResumeMutation.mutate(resume!)}
                  className={`place-self-end p-2 bg-secondary hover:bg-secondary/60 rounded-xl text-text-secondary font-semibold cursor-pointer ${
                    moduleResumeMutation.isPending && "cursor-progress"
                  }`}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <MdOutlineKeyboardArrowDown size={30} color={Colors.primary} />
          }
          aria-controls="extra-content"
          id="extra-content"
        >
          <div className="flex gap-4 text-text-secondary text-xl items-center">
            <LuTableOfContents />
            <p className="font-semibold">Contenido de apoyo</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ol className="list-outside mb-6 px-4 space-y-2">
            {contentList.length > 0 ? (
              contentList.map((item, index) => (
                <li
                  key={index}
                  className="opacity-100 translate-y-0 transition-all duration-300 ease-out list-decimal"
                >
                  <div className="flex flex-row items-center justify-between">
                    {item.topic}
                    <button
                      disabled={additionalDeleteMutation.isPending}
                      onClick={() => additionalDeleteMutation.mutate(item.id!)}
                      className={`cursor-pointer ${
                        additionalDeleteMutation.isPending && "cursor-progress"
                      }`}
                    >
                      <MdDeleteForever className="text-3xl text-danger" />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No existen contenidos agregados aún.</p>
            )}
          </ol>
          <div className="flex flex-col gap-4">
            <InputComponent
              id="extra-content-description"
              label="Ingresa una breve descripción del contenido"
              onChangeText={(text) =>
                setAdditionalContent((prev) => ({ ...prev, topic: text }))
              }
              text={additionalContent.topic}
            />
            <InputComponent
              id="extra-content-url"
              label="Ingresa un link del contenido"
              onChangeText={(text) =>
                setAdditionalContent((prev) => ({ ...prev, url: text }))
              }
              text={additionalContent.url}
            />
            <button
              onClick={async () => {
                if (
                  additionalContent.topic.trim() !== "" &&
                  additionalContent.url.trim() !== ""
                ) {
                  await additionalMutation.mutateAsync(additionalContent);
                  setAdditionalContent((prev) => ({
                    ...prev,
                    topic: "",
                    url: "",
                  }));
                }
              }}
              className={`place-self-center cursor-pointer ${
                additionalMutation.isPending && "cursor-progress"
              }`}
              disabled={additionalMutation.isPending}
            >
              <IoMdAddCircleOutline
                size={32}
                color={Colors.primary}
                className="transition-all duration-200 hover:rotate-90"
              />
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <MdOutlineKeyboardArrowDown size={30} color={Colors.primary} />
          }
          aria-controls="bibliography"
          id="bibliography"
        >
          <div className="flex gap-4 text-text-secondary text-xl items-center">
            <FaBookOpen />
            <p className="font-semibold">Bibliografía</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ol className="list-outside mb-6 px-4 space-y-2">
            {bibliographyList.length > 0 ? (
              bibliographyList.map((item, index) => (
                <li
                  key={index}
                  className="opacity-100 translate-y-0 transition-all duration-300 ease-out list-decimal"
                >
                  <div className="flex flex-row items-center justify-between">
                    {item.content}
                    <button
                      disabled={bibliographyDeleteMutation.isPending}
                      onClick={() =>
                        bibliographyDeleteMutation.mutate(item.id!)
                      }
                      className={`cursor-pointer ${
                        bibliographyDeleteMutation.isPending &&
                        "cursor-progress"
                      }`}
                    >
                      <MdDeleteForever className="text-3xl text-danger" />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No existe bibliografía agregada aún.</p>
            )}
          </ol>
          <div className="flex flex-col gap-4">
            <InputComponent
              id="bibliography"
              label="Ingresa una bibliografía"
              onChangeText={(text) => setBibliography(text)}
              text={bibliography}
            />
            <button
              onClick={async () => {
                if (bibliography?.trim() !== "") {
                  await bibliographyMutation.mutateAsync({
                    content: bibliography!,
                    moduleId: moduleId,
                  });
                  setBibliography("");
                }
              }}
              className={`place-self-center cursor-pointer ${
                bibliographyMutation.isPending && "cursor-progress"
              }`}
              disabled={bibliographyMutation.isPending}
            >
              <IoMdAddCircleOutline
                size={32}
                color={Colors.primary}
                className="transition-all duration-200 hover:rotate-90"
              />
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
