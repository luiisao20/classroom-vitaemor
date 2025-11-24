import { useQuery } from "@tanstack/react-query";
import { getMeeting } from "../../core/database/meetings/get-meeting.action";

export const useMeeting = (id: number) => {
  const meetingQuery = useQuery({
    queryFn: () => getMeeting(id),
    queryKey: ["meeting", id],
    staleTime: 1000 * 60 * 60,
  });

  return { meetingQuery };
};
