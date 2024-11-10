import  { useQuery } from "@tanstack/react-query"
import { grtOtherCases } from "./api"


const useGetOther = (cartId) =>{
    const {data,isPending,isError,error, refetch} = useQuery({
        queryKey:['other'],
        queryFn: ()=>grtOtherCases(cartId)
    })
    
    return{
        data,isPending,isError,error, refetch
    }
}

export default useGetOther