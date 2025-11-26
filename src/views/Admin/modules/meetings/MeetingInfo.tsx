import { useEffect, useState } from "react";
import type { Meeting, StudentList } from "../../../../core/interfaces";
import { useStudents } from "../../../../presentation/students/useStudents";
import { useMeeting } from "../../../../presentation/meetings/useMeeting";
import { useParams } from "react-router";
import { getFormattedDate } from "../../../../helpers/get-date-formatted";
import { useAssistance } from "../../../../presentation/meetings/useAssistance";
import { ModalMessage } from "../../../../components/modal/ModalMessage";

interface Modal {
  open: boolean;
  message: string;
}

export const MeetingInfo = () => {
  const { meetingId } = useParams();
  const idMeeting = parseInt(meetingId!);
  const [studentsEmptyAssistance, setStudentsEmptyAssistance] = useState<
    StudentList[]
  >([]);
  const [studentsAssistance, setStudentsAssistance] = useState<StudentList[]>(
    []
  );
  const [meetingInfo, setMeetingInfo] = useState<Meeting>();
  const [modal, setModal] = useState<Modal>({
    open: false,
    message: "¡La asistencia se ha guardado con éxito!",
  });

  const { studentsQuery } = useStudents('');
  const { meetingQuery } = useMeeting(idMeeting);
  const { assistanceMutation, assistanceQuery } = useAssistance(idMeeting);

  useEffect(() => {
    if (!assistanceQuery.data && studentsQuery.data) {
      setStudentsEmptyAssistance(
        studentsQuery.data.map((student) => ({
          ...student,
          assistance: true,
        }))
      );
    }

    if (assistanceQuery.data) {
      setStudentsAssistance(assistanceQuery.data);
    }
  }, [assistanceQuery.data, studentsQuery.data]);

  useEffect(() => {
    if (meetingQuery.data) setMeetingInfo(meetingQuery.data);
  }, [meetingQuery.data]);

  useEffect(() => {
    if (assistanceMutation.isSuccess)
      setModal((prev) => ({ ...prev, open: true }));
  }, [assistanceMutation.isSuccess]);

  const handleSelect = (index: number, value: boolean) => {
    if (studentsAssistance.length > 0) {
      setStudentsAssistance((prev) =>
        prev.map((s, i) => (i === index ? { ...s, assistance: value } : s))
      );
      return;
    }
    setStudentsEmptyAssistance((prev) =>
      prev.map((s, i) => (i === index ? { ...s, assistance: value } : s))
    );
  };

  if (meetingQuery.isLoading) {
    return <></>;
  }

  return (
    <>
      <ModalMessage
        open={modal.open}
        message={modal.message}
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
      />
      <div className="flex flex-col my-6">
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-primary font-semibold text-center">
            Registrar la asistencia de la reunión {meetingInfo?.number}
          </h2>
          <h2 className="text-text-secondary">
            <span className="font-semibold">Fecha de la reunión:</span>{" "}
            {getFormattedDate(`${meetingInfo?.date}`)}
          </h2>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Estudiante
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Asiste / Falta
                </th>
              </tr>
            </thead>
            <tbody>
              {(studentsAssistance.length > 0
                ? studentsAssistance
                : studentsEmptyAssistance
              ).map((student, index) => (
                <tr
                  key={index}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {student.lastName} {student.firstName}
                  </th>
                  <td className="px-6 py-4 flex gap-8 justify-center">
                    <div className="flex items-center">
                      <input
                        id={`inline-in-${index}`}
                        type="radio"
                        checked={student.assistance}
                        onChange={() => handleSelect(index, true)}
                        name={`inline-radio-group-${index}`}
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        id={`inline-miss-${index}`}
                        type="radio"
                        checked={!student.assistance}
                        onChange={() => handleSelect(index, false)}
                        name={`inline-radio-group-${index}`}
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={() =>
            assistanceMutation.mutate(
              studentsAssistance.length > 0
                ? studentsAssistance
                : studentsEmptyAssistance
            )
          }
          disabled={assistanceMutation.isPending}
          className={`bg-secondary place-self-end font-semibold text-text-secondary hover:bg-secondary/60 p-4 rounded-xl cursor-pointer ${
            assistanceMutation.isPending && "cursor-progress"
          }`}
        >
          Registrar aistencia
        </button>
      </div>
    </>
  );
};
