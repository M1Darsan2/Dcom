import { useCreateProduct, useGetAllProductHook, useToggleProduct } from '@/hooks/product.hook'
import { Plus, Search } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { Spinner } from '@/components/ui/spinner'

const ProductDashboard = () => {
  const [searchInput, setsearchInput] = useState("")
  const [page, setpage] = useState(1)
  const [activeSearch, setactiveSearch] = useState("")
  const [open, setOpen] = useState(false)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setpage(1)
    setactiveSearch(searchInput)
  }

  const {data} = useGetAllProductHook({
    page,
    search: activeSearch,
  })

  const {mutate, isPending} = useCreateProduct()
  const {mutate: toggleProduct} = useToggleProduct()
  const {register, handleSubmit, reset} = useForm()

  const createProductHandler = (data) => {
    const formData = new FormData()

    if(data.name) formData.append("name", data.name)
    if(data.description) formData.append("description", data.description)
    if(data.price) formData.append("price", data.price)
    if(data.category) formData.append("category", data.category)
    if(data.image && data.image[0]) formData.append("image", data.image[0])
    
    mutate(formData, {
      onSuccess: () => {
        reset()
        setOpen(false)
      }
    })
  }

  const createToggle = (id) => {
    toggleProduct(id)
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-[1400px] mx-auto px-8 py-8'>
        
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>Products</h1>
            <p className='text-sm text-gray-600 mt-1'>{data?.products?.length || 0} total products</p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <button className='flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors duration-200 shadow-sm'>
                  <Plus className='w-4 h-4' />
                  Create Product
                </button>
              }
            />
            
            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogDescription>
                  Add a new product to your inventory
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(createProductHandler)} className='space-y-4 mt-4'>
                <input 
                  type="text" 
                  placeholder='Product Name' 
                  className='w-full px-4 py-3 border border-emerald-100 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors duration-200'
                  {...register('name')} 
                />
                <select 
                  className='w-full px-4 py-3 border border-emerald-100 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors duration-200'
                  {...register('category')}
                >
                  <option value="">Select Category</option>
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
                <input 
                  type="text" 
                  placeholder='Description' 
                  className='w-full px-4 py-3 border border-emerald-100 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors duration-200'
                  {...register('description')} 
                />
                <input 
                  type="number" 
                  placeholder='Price' 
                  className='w-full px-4 py-3 border border-emerald-100 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors duration-200'
                  {...register('price')} 
                />
                <input 
                  type="file" 
                  accept="image/*"
                  className='w-full px-4 py-3 border border-emerald-100 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-colors duration-200'
                  {...register('image')} 
                />
                <button 
                  type='submit' 
                  disabled={isPending}
                  className='w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center shadow-sm'
                >
                  {isPending ? <Spinner /> : "Create Product"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <form onSubmit={handleSearchSubmit} className='mb-8'>
          <div className='flex gap-2 max-w-xl'>
            <input 
              type="text" 
              className='flex-1 px-4 py-3 border border-emerald-100 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors duration-200' 
              placeholder='Search products...'
              value={searchInput} 
              onChange={(e) => setsearchInput(e.target.value)}
            />
            <button 
              type='submit' 
              className='px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors duration-200 flex items-center gap-2 shadow-sm'
            >
              <Search className='w-4 h-4' />
              Search
            </button>
          </div>
        </form>

        <div className='border border-emerald-100 shadow-sm rounded-lg overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-emerald-50 border-b border-emerald-100'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>Product</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>Category</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>Price</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>Featured</th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-emerald-100'>
              {data?.products?.map((item, index) => {
                return (
                  <tr key={item?._id ?? index} className='hover:bg-emerald-50 transition-colors duration-200'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='h-12 w-12 bg-emerald-50 rounded-lg overflow-hidden flex-shrink-0'>
                          <img 
                            src={item.image} 
                            className='h-full w-full object-cover' 
                            alt={item.name} 
                          />
                        </div>
                        <span className='text-sm font-medium text-gray-900'>{item.name}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-sm text-gray-700'>{item.category}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-sm font-semibold text-emerald-700'>${item.price}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.isFeatured 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.isFeatured ? "Featured" : "Standard"}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => createToggle(item._id)}
                        className='text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors duration-200'
                      >
                        Toggle
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {data?.totalPages > 1 && (
          <div className='flex items-center justify-center gap-6 mt-8'>
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
        )}
      </div>
    </div>
  )
}

export default ProductDashboard