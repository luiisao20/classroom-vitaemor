import { useParams } from "react-router";
import { useOneModule } from "../../presentation/modules/useOneModule";

export const ModuleInfoStudent = () => {
  const { id } = useParams();
  const moduleId = parseInt(id!);
  const {
    moduleInfoQuery: { data },
  } = useOneModule(moduleId);

  return (
    <div>
      <h2 className="text-primary font-semibold text-xl text-center">
        {data?.title}
      </h2>
      <h2 className="text-text font-semibold text-lg my-4">Resumen:</h2>
      <p className="whitespace-pre-line text-justify mx-4 text-sm">
        {data?.resume}
      </p>
      <h2 className="text-text font-semibold text-lg my-4">Contenido extra:</h2>
      <ol className="list-[lower-roman] list-inside my-4 space-y-2 mx-4">
        {data?.additionalContent.map((item, index) => (
          <li
            className="cursor-pointer hover:underline hover:underline-offset-2"
            key={index}
          >
            <a href={item.url} target="_blank" className="text-sm">
              {item.topic}
            </a>
          </li>
        ))}
      </ol>
      <h2 className="text-text font-semibold text-lg my-4">Bibliografía:</h2>
      <ol className="list-[lower-roman] list-inside my-4 space-y-2 mx-4">
        {data?.bibliography.map((item, index) => (
          <li
            className="cursor-pointer text-sm hover:underline hover:underline-offset-2 text-justify"
            key={index}
          >
            <span>
              {item}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
