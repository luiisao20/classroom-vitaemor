import { useEffect, useState } from "react";
import { CustomDatePicker } from "../../../../components/input/DatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Meeting } from "../../../../core/interfaces";
import { useMeetings } from "../../../../presentation/meetings/useMeetings";
import { Link, useParams } from "react-router";
import { GoArrowRight } from "react-icons/go";
import { Colors } from "../../../../assets/colors";

export const MeetingsModule = () => {
  const { id } = useParams();
  const moduleId = parseInt(`${id}`);
  const [dateMeeting, setDateMeeting] = useState<Dayjs>(dayjs(new Date()));
  const [meetingsList, setMeetingsList] = useState<Meeting[]>([]);

  const { meetingsMutation, meetingsQuery } = useMeetings(moduleId);

  useEffect(() => {
    if (meetingsQuery.data) setMeetingsList(meetingsQuery.data);
  }, [meetingsQuery.data]);

  return (
    <div className="my-6">
      <h2 className="text-primary text-xl font-semibold text-center">
        Reuniones
      </h2>
      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold text-text-secondary">
          ¿Crear una nuena reunión?
        </h2>
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="font-semibold">Fecha de la reunión:</p>
            <CustomDatePicker
              selected={dateMeeting}
              onChange={(date) => setDateMeeting(date!)}
            />
          </div>
          <button
            onClick={() =>
              meetingsMutation.mutate({
                date: dateMeeting,
                number: meetingsList.length + 1,
              })
            }
            disabled={meetingsMutation.isPending}
            className={`bg-secondary text-text-secondary font-semibold p-4 rounded-xl hover:bg-secondary/60 cursor-pointer ${
              meetingsMutation.isPending && "cursor-progress"
            }`}
          >
            Crear reunión
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-4 my-4 w-3/4 mx-auto">
        {meetingsList.map((item) => (
          <div key={item.id}>
            <Link
              to={`${item.id!}`}
              className="shadow rounded-xl cursor-pointer p-2 flex justify-between px-4 items-center hover:transition hover:delay-100 hover:scale-115 hover:shadow-secondary"
            >
              Reunión {item.number}{" "}
              <GoArrowRight size={25} color={Colors.primary} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
