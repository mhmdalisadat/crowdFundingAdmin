import { useMutation }  from "@tanstack/react-query"
import useGetCompanyInfo from "./useGetCompanyInfo";
import { postCompanyInfo } from "./api";


const usePostComapnyInfo = (cartId) =>{
    const {refetch} = useGetCompanyInfo(cartId)
    const {mutate, isPending,isSuccess,isError,error} = useMutation({
        mutationKey: ['CompanyInfo',cartId],
        mutationFn: ({localData}) => postCompanyInfo({cartId, localData}),
        onSettled:()=>{
            refetch()
        }
      });
      return{
        mutate, isPending,isSuccess,isError,error
      }
}

export default usePostComapnyInfo