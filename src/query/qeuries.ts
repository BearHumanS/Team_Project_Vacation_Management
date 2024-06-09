import { useQuery } from '@tanstack/react-query';
import { scheduleList } from '@/api/home/scheduleList';

export const useScheduleList = (year: number) => {
  return useQuery({
    queryKey: ['scheduleList', year],
    queryFn: () => scheduleList(year),
  });
};
