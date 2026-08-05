import React from 'react'

const ProductSearchBar = ({searchInput, setsearchInput, onSearchSubmit, onSubmitReset}) => {
  return (
    <div className='w-full h-[240px] bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center border-b border-emerald-100'>
      <div className='text-center space-y-6'>
        <h1 className='text-4xl font-bold text-gray-900 tracking-tight'>
          Discover Products
        </h1>
        <form onSubmit={onSearchSubmit} className='flex items-center max-w-2xl mx-auto gap-2'>
          <div className='flex flex-1'>
            <input 
              type="text" 
              placeholder='Search products...' 
              className='flex-1 px-6 py-3.5 border border-emerald-100 rounded-l-lg text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors duration-200'
              value={searchInput} 
              onChange={(e) => setsearchInput(e.target.value)}
            />
            <button 
              type='submit' 
              className='px-8 py-3.5 bg-emerald-700 text-white font-medium rounded-r-lg hover:bg-emerald-800 transition-colors duration-200'
            >
              Search
            </button>
          </div>
          <button 
            type='button'
            onClick={onSubmitReset}
            className='px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors duration-200'
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductSearchBar