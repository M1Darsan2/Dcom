import { useGetAllProductHook } from '@/hooks/product.hook'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from './ui/spinner'

const AllProduct = ({page, setpage, activeSearch, category, priceRange},) => {
  const {data, isLoading} = useGetAllProductHook({
    page,
    search:activeSearch,
    category:category,
     minPrice: priceRange.min,
  maxPrice: priceRange.max
  })
  const navigate = useNavigate()
  
  if(isLoading){
    return <div className='h-screen text-3xl w-full flex items-center justify-center'><Spinner/></div>
  }
 
  const navigateSingleProduct = (id) => {
    navigate(`/product/${id}`)
  }
  return (
    <div className='min-h-screen w-full lg:w-[80%] flex flex-col justify-between bg-white'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8'>
        {data?.products.map((item, index) => {
          return(
            <div 
              key={item?._id ?? index}
              onClick={() => navigateSingleProduct(item._id)} 
              className='group cursor-pointer bg-white rounded-lg border border-emerald-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-[380px]'
            >
              <div className='w-full h-[240px] bg-emerald-50 overflow-hidden'>
                <img 
                  src={item.image} 
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                  alt={item.name} 
                />
              </div>
              <div className='flex-1 flex flex-col justify-between p-4'>
                <div className='space-y-2'>
                  <h3 className='text-gray-900 font-medium text-base leading-tight line-clamp-2'>
                    {item.name}
                  </h3>
                  <p className='text-2xl font-bold text-emerald-700'>
                    ${item.price}
                  </p>
                </div>
                
                <div className='mt-3'>
                  <span className='inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md'>
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex items-center justify-center gap-6 py-8 border-t border-emerald-100'>
        <button 
          disabled={page === 1}
          onClick={() => setpage((prev) => prev - 1)}
          className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            page === 1 
              ? 'bg-emerald-50 text-emerald-300 cursor-not-allowed' 
              : 'bg-emerald-700 text-white hover:bg-emerald-800'
          }`}
        >
          Previous
        </button>
        <div className='flex items-center gap-2 text-sm'>
          <span className='font-semibold text-gray-900'>{data?.page}</span>
          <span className='text-gray-500'>of</span>
          <span className='font-semibold text-gray-900'>{data?.totalPages}</span>
        </div>
        <button 
          disabled={!data?.hasMore}
          onClick={() => setpage((prev) => prev + 1)}
          className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            !data?.hasMore 
              ? 'bg-emerald-50 text-emerald-300 cursor-not-allowed' 
              : 'bg-emerald-700 text-white hover:bg-emerald-800'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default AllProduct