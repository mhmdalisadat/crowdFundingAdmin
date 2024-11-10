import { useMutation } from "@tanstack/react-query"
import { PostFinish } from "./cartService"
import useGetCards from "./useGetCarts";






const usePostFinish = (cartId) =>{
    const { refetch } = useGetCards(cartId);
    const {mutate, isPending,isError,isSuccess} = useMutation({
        mutationKey: ['PostFinish'],
        mutationFn: ({ finish_cart })=>PostFinish({ cartId, finish_cart }),
        onSettled:()=>{
            refetch()
        }
    })
    return{
        mutate, isPending,isError,isSuccess
    }
}


export default usePostFinish