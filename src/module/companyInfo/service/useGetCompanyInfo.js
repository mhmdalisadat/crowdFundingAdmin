import  { useQuery } from "@tanstack/react-query"
import { getCompanyInfo } from "./api"


const useGetCompanyInfo = (cartId) =>{
    const {data,isPending,isError,error, refetch} = useQuery({
        queryKey:['companyInfo' , cartId],
        queryFn: ()=>getCompanyInfo(cartId)
    })
    return{
        data,isPending,isError,error, refetch
    }
}

export default useGetCompanyInfo