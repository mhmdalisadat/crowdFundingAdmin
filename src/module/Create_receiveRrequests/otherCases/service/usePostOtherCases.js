import  { useMutation } from "@tanstack/react-query"
import { postOtherCases } from "./api"
import useGetOther from "./useGetOtherCases"


const usePostOther = (cartId) =>{
    const {refetch} = useGetOther(cartId)
    const {date, mutate, isPending,isError,isSuccess} = useMutation({
        mutationKey:['post other'],
        mutationFn: ({localData})=>postOtherCases({cartId, localData}),
        onSettled: ()=>{
            refetch()
        }
    })
    return{
        date, mutate, isPending,isError,isSuccess
    }
}


export default usePostOther