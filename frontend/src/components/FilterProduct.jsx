import React from 'react'
const FilterProduct = ({category, setcategory, priceRange, setPriceRange, onReset}) => {
  return (
    <div className='hidden lg:block w-[280px] h-screen sticky top-0 bg-white border-r border-emerald-100'>
      <div className='p-6'>
        
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-lg font-bold text-gray-900 tracking-tight'>Filters</h2>
          {(category || priceRange.min || priceRange.max) && (
            <button 
              className='text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors duration-200'
              onClick={onReset}
            >
              Clear all
            </button>
          )}
        </div>
        <div className='mb-8 pb-8 border-b border-emerald-100'>
          <label className='block text-sm font-semibold text-gray-900 mb-3'>
            Category
          </label>
          <select 
            value={category} 
            onChange={(e) => setcategory(e.target.value)}
            className='w-full border border-emerald-100 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors duration-200'
          >
            <option value="">All Categories</option>
             <option value="Mens">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Bags">Bags</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Watches">Watches</option>
                  <option value="Sportswear">Sportswear</option>
                  <option value="Winterwear">Winterwear</option>
                  <option value="Ethnic Wear">Ethnic Wear</option>
                  <option value="Innerwear">Innerwear</option>
                  <option value="Beauty">Beauty</option>
          </select>
        </div>
        <div>
          <label className='block text-sm font-semibold text-gray-900 mb-3'>
            Price Range
          </label>
          <div className='space-y-4'>
            <div>
              <label className='block text-xs text-gray-600 mb-1.5'>Minimum</label>
              <input 
                type="number" 
                value={priceRange.min} 
                onChange={(e) => setPriceRange((prev) => ({...prev, min: e.target.value}))}
                placeholder='$ 0'
                className='w-full border border-emerald-100 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors duration-200'
              />
            </div>
            <div>
              <label className='block text-xs text-gray-600 mb-1.5'>Maximum</label>
              <input 
                type="number" 
                value={priceRange.max} 
                onChange={(e) => setPriceRange((prev) => ({...prev, max: e.target.value}))}
                placeholder='$ 1000'
                className='w-full border border-emerald-100 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors duration-200'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FilterProduct