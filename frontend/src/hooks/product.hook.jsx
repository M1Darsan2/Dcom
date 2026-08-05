import { createProductApi, deleteProductApi, getAllProductApi, getFeaturedProductApi, getSingleProductApi, toggleProductApi } from "@/Api/product.api"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateProduct = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:createProductApi,
        onSuccess:(data)=>{
            toast.success("Product created")
            queryClient.invalidateQueries('getAllProduct')
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}

export const useGetAllProductHook = ({
  page = 1,
  limit = 20,
  search = "",
  category = "",
  minPrice = "",
  maxPrice = ""
} = {}) => {
  return useQuery({
    queryKey: [
      'getAllProduct',
      page,
      limit,
      search,
      category,
      minPrice,
      maxPrice
    ],
    queryFn: ({ signal }) =>
      getAllProductApi({
        page,
        limit,
        search,
        category,
        minPrice,
        maxPrice
      }, signal),
    placeholderData: keepPreviousData
  });
};

export const useDeleteProductApi = ()=>{
    return useMutation({
        mutationFn:deleteProductApi,
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}


// export const useToggleProduct = ()=>{
//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationFn:toggleProductApi,

//         onSuccess:(data)=>{

//              queryClient.invalidateQueries('getAllProduct')
//              toast.success("Product Toggled successfully")
        

//             console.log(data)
//         },
//         onError:(err)=>{
//             console.log(err)
//         }
//     })
// }

export const useToggleProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: toggleProductApi,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['getAllProduct'] })

      const previousData = queryClient.getQueriesData({ queryKey: ['getAllProduct'] })

      queryClient.setQueriesData({ queryKey: ['getAllProduct'] }, (old) => {
        if (!old?.products) return old
        return {
          ...old,
          products: old.products.map((item) =>
            item._id === id ? { ...item, isFeatured: !item.isFeatured } : item
          )
        }
      })

      return { previousData }
    },

    onError: (err, id, context) => {
      context?.previousData?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
      console.log(err)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllProduct'] })
    },

    onSuccess: () => {
      toast.success("Product Toggled successfully")
    }
  })
}
export const useGetSingleProduct=(id)=>{
    return useQuery({
        queryFn:()=>getSingleProductApi(id),
        queryKey:['getSingleProduct',id]
    })
}
export const useGetFeaturedProcut=()=>{
    return useQuery({
        queryFn:getFeaturedProductApi,
        queryKey:['getFeatured']
    })
}