import { useMutation } from '@tanstack/react-query';
import { updatePlan } from './api';
import useGetCard from './useGetCard';
import { useGetPlans } from '../../hooks/getPlans';

const useUpdatePlan = () => {
  const { refetch } = useGetCard();
  const { refetch:refetchPlans } = useGetPlans();
  
  

  const {
    mutate,
    isLoading: isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ['updatePlan'],
    mutationFn: (planData) => updatePlan(planData),
    onSettled: () => {
      refetch();
      refetchPlans()
    },
  });

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default useUpdatePlan;
