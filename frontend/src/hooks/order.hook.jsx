import { getUserOrders } from "@/Api/order.api"
import { useQuery } from "@tanstack/react-query"

export const useGetUserOrders = () => {
    return useQuery({
        queryFn: getUserOrders,
        queryKey: ['getUserOrders'],
        retry: false,
    })
}