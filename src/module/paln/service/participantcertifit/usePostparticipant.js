import { useMutation } from '@tanstack/react-query';
import { postParticipant } from './api';

const usePost = () => {
  const mutation = useMutation({
    mutationFn: ({ data, trace_code }) => postParticipant({ data, trace_code }),
  });

  return {
    ...mutation,
  };
};

export default usePost;
