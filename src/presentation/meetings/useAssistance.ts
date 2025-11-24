import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StudentList } from "../../core/interfaces";
import { insertAssistances } from "../../core/database/meetings/insert-assistance.action";
import { getMeetingAssistance } from "../../core/database/meetings/get-meeting-assistance.action";

export const useAssistance = (meetingId: number) => {
  const queryClient = useQueryClient();

  const assistanceQuery = useQuery({
    queryFn: () => getMeetingAssistance(meetingId),
    queryKey: ["assistance", meetingId],
    staleTime: 1000 * 60 * 60,
    enabled: !!meetingId,
  });

  const assistanceMutation = useMutation({
    mutationFn: (studentList: StudentList[]) =>
      insertAssistances(studentList, meetingId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assistance", meetingId],
      });
    },

    onError: (error) => {
      alert(`Ha ocurrido un error inesperado ${error}`);
    },
  });

  return { assistanceMutation, assistanceQuery };
};
