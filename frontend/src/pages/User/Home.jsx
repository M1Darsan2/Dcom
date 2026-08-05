import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import { useGetFeaturedProcut } from '@/hooks/product.hook'

const Home = () => {
  const { data } = useGetFeaturedProcut()

  return (
    <div className='min-h-screen w-full bg-white'>
     <div className='h-[80vh] w-[90vw] mx-auto flex items-center gap-8'>
  <div className='w-3/4 h-full flex items-center justify-center'>
    <img src="/img.jpg" className='max-w-full max-h-full object-contain' alt="" />
  </div>


  <div className='w-1/4 flex flex-col gap-4'>
    <h1 className='text-4xl font-bold text-gray-900 tracking-tight leading-tight'>
      Welcome to <span className='text-emerald-700'>DCom</span>
    </h1>
    <p className='text-lg text-gray-600 leading-relaxed'>
      Your one-stop destination for smart, effortless shopping.
    </p>
    <p className='text-sm text-gray-500 leading-relaxed'>
      Discover curated products, fast delivery, and a seamless checkout experience — all in one place.
    </p>
  </div>
</div>

      <div className='min-h-fit w-full max-w-[1400px] mx-auto'>
        <h1 className='font-bold text-2xl text-gray-900 tracking-tight px-6 lg:px-8 my-8'>
          Featured Products
        </h1>
        <div className='flex flex-wrap gap-6 mb-12 px-6 lg:px-8'>
          {data?.map((item, index) => {
            return (
              <div
                key={item?._id ?? index}
                className='rounded-lg border border-emerald-100 shadow-sm hover:shadow-md transition-shadow duration-200'
              >
                <FeaturedProducts item={item} />
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Home