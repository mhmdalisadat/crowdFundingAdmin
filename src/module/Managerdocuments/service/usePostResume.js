import { useMutation }  from "@tanstack/react-query"
import { postResume } from "./api";
import useGetResume from "./useGetResume";



const usePostResume = (cartId) =>{
    const {refetch} = useGetResume(cartId)
    const {mutate, isPending,isSuccess,isError,error} = useMutation({
        mutationKey: ['set management'],
        mutationFn: ({formData}) => postResume({cartId, formData}),
        onSettled:()=>{
            refetch()
        }
      });
      return{
        mutate, isPending,isSuccess,isError,error
      }
}

export default usePostResume