import { useAddToCartHook } from '@/hooks/cart.hook'
import { useGetSingleProduct } from '@/hooks/product.hook'
import { Spinner } from '@/components/ui/spinner'
import React from 'react'
import { useParams } from 'react-router-dom'
const SingleProduct = () => {
  const {id} = useParams()
  const {data} = useGetSingleProduct(id)
  
  const {mutate, isPending} = useAddToCartHook()
  
  const addTocartFunction = (id) => {
    mutate({productId: id})
  }
  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          
        
          <div className='w-full h-[500px] bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm overflow-hidden'>
            <img 
              src={data?.image} 
              alt={data?.name}
              className='w-full h-full object-contain p-6'
            />
          </div>
          
          <div className='flex flex-col justify-center space-y-6'>
            
            <span className='w-fit px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium uppercase tracking-wide rounded-md'>
              {data?.category}
            </span>
           
            <h1 className='text-4xl font-bold text-gray-900 tracking-tight leading-tight'>
              {data?.name}
            </h1>
            
            <p className='text-3xl font-bold text-emerald-700'>
              ${data?.price}
            </p>
            
            <p className='text-base text-gray-600 leading-relaxed border-t border-emerald-100 pt-6'>
              {data?.description}
            </p>
            <button 
              onClick={() => addTocartFunction(data?._id)}
              disabled={isPending}
              className='w-full lg:w-auto px-12 py-4 bg-emerald-700 hover:bg-emerald-800 text-white text-base font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center shadow-sm'
            >
              {isPending ? <Spinner /> : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SingleProduct