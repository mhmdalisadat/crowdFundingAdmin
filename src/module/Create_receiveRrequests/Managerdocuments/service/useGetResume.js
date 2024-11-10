import  { useQuery } from "@tanstack/react-query"
import { getResume } from "./api"


const useGetResume = (cartId) =>{
    const {data,isPending,isError,error, refetch} = useQuery({
        queryKey:['managementDoc' , cartId],
        queryFn: ()=>getResume(cartId)
    })
    return{
        data,isPending,isError,error, refetch
    }

}


export default useGetResume