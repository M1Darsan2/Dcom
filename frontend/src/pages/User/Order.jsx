import { useGetUserOrders } from '@/hooks/order.hook'
import { Package, Receipt } from 'lucide-react'
import React from 'react'

const Orders = () => {
  const { data, isLoading } = useGetUserOrders()

  if (isLoading) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='w-10 h-10 border-4 border-emerald-100 border-t-emerald-700 rounded-full animate-spin' />
      </div>
    )
  }

  const orders = data?.orders || []

  return (
    <div className='min-h-screen bg-white py-8'>
      <div className='max-w-4xl mx-auto px-4 lg:px-8'>

        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>My Orders</h1>
          <p className='text-sm text-gray-600 mt-1'>
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
          </p>
        </div>

        {orders.length === 0 ? (
          <div className='bg-white rounded-lg border border-emerald-100 shadow-sm p-12 text-center'>
            <Receipt className='w-16 h-16 text-emerald-200 mx-auto mb-4' />
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>No orders yet</h2>
            <p className='text-gray-600'>Your order history will show up here once you make a purchase</p>
          </div>
        ) : (
          <div className='space-y-6'>
            {orders.map((order) => {
              return (
                <div key={order._id} className='bg-white rounded-lg border border-emerald-100 shadow-sm overflow-hidden'>

                  <div className='bg-emerald-50 border-b border-emerald-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <Package className='w-5 h-5 text-emerald-700' />
                      </div>
                      <div>
                        <p className='text-sm font-semibold text-gray-900'>
                          Order #{order._id.slice(-8).toUpperCase()}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <p className='text-lg font-bold text-emerald-700'>
                      ${order.totalAmount}
                    </p>
                  </div>

                  <div className='divide-y divide-emerald-100'>
                    {order.products.map((item, index) => {
                      const name = item.name || item.product?.name
                      const image = item.image || item.product?.image

                      return (
                        <div key={item.product?._id ?? item.product ?? index} className='flex items-center gap-4 px-6 py-4'>
                          <div className='w-16 h-16 bg-emerald-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center'>
                            {image ? (
                              <img
                                src={image}
                                alt={name || 'Product'}
                                className='w-full h-full object-contain p-1'
                              />
                            ) : (
                              <Package className='w-6 h-6 text-emerald-300' />
                            )}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-900 truncate'>
                              {name || 'Product no longer available'}
                            </p>
                            <p className='text-xs text-gray-500'>
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className='text-sm font-semibold text-gray-900'>
                            ${item.price}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders