import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import useGetValidation from "./useGetValidation";
import { postValidation } from "./api";

const usePostValidation = (cartId) => {
    const { refetch } = useGetValidation(cartId);
    
    const { mutate, isPending, isSuccess, isError, error: mutationError } = useMutation({
        mutationKey: ['validationPost'],
        mutationFn: ({ formData }) => postValidation({ cartId, formData }),
        onSettled: () => {
            refetch();
        },
        onError: (error) => {
            if (error.response?.status === 400) {
                toast.error("لطفا تمام فایل ها را بارگذاری کنید  ");
            }
        },
    });

    return {
        mutate,
        isPending,
        isSuccess,
        isError,
        error: mutationError,
    };
};

export default usePostValidation;
