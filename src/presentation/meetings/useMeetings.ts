import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { insertNewMeeting } from "../../core/database/meetings/insert-new-metting.action";
import type { Meeting } from "../../core/interfaces";
import { getMeetings } from "../../core/database/meetings/get-meetings.action";

export const useMeetings = (moduleId: number) => {
  const queryClient = useQueryClient();

  const meetingsQuery = useQuery({
    queryFn: () => getMeetings(moduleId),
    queryKey: ["meetings", moduleId],
    staleTime: 1000 * 60 * 60,
  });

  const meetingsMutation = useMutation({
    mutationFn: (meeting: Meeting) => insertNewMeeting(meeting, moduleId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meetings", moduleId],
      });
    },

    onError: (error) => {
      alert(`Ha ocurrido un error inesperado ${error}`);
    },
  });

  return { meetingsMutation, meetingsQuery };
};
