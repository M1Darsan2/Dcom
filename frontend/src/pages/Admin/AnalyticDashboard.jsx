import { useGetDailySalesData, useGetDashBoardData } from '@/hooks/dashboard.hook'
import React, { useMemo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const AnalyticDashboard = () => {
  const {data} = useGetDashBoardData()
 
  const {startDate, endDate} = useMemo(() => {
    const end = new Date()
    const start = new Date()

    start.setDate(end.getDate() - 7)
    end.setDate(end.getDate() + 2)

    const toStr = (d) => d.toISOString().split("T")[0]

    return {
      startDate: toStr(start),
      endDate: toStr(end)
    }
  }, [])

  const {data: dailySales} = useGetDailySalesData(startDate, endDate)

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-[1400px] mx-auto px-8 py-8'>
        
        {/* Page Title */}
        <h1 className='text-2xl font-bold text-gray-900 tracking-tight mb-8'>Analytics Dashboard</h1>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          <div className='border border-emerald-100 shadow-sm rounded-lg p-6'>
            <p className='text-sm text-gray-600 mb-1'>Total Users</p>
            <p className='text-3xl font-bold text-emerald-700'>{data?.users || 0}</p>
          </div>

          <div className='border border-emerald-100 shadow-sm rounded-lg p-6'>
            <p className='text-sm text-gray-600 mb-1'>Total Products</p>
            <p className='text-3xl font-bold text-emerald-700'>{data?.products || 0}</p>
          </div>

          <div className='border border-emerald-100 shadow-sm rounded-lg p-6'>
            <p className='text-sm text-gray-600 mb-1'>Total Revenue</p>
            <p className='text-3xl font-bold text-emerald-700'>${data?.totalRevenue || 0}</p>
          </div>

          <div className='border border-emerald-100 shadow-sm rounded-lg p-6'>
            <p className='text-sm text-gray-600 mb-1'>Total Sales</p>
            <p className='text-3xl font-bold text-emerald-700'>{data?.totalSales || 0}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className='border border-emerald-100 shadow-sm rounded-lg p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-6'>Sales & Revenue</h2>
          
          <div className='h-[400px] w-full'>
            <ResponsiveContainer>
              <LineChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5"/>
                <XAxis 
                  dataKey="date"
                  tick={{fontSize: 12, fill: '#6b7280'}}
                  stroke="#a7f3d0"
                />
                <YAxis 
                  yAxisId='left'
                  tick={{fontSize: 12, fill: '#6b7280'}}
                  stroke="#a7f3d0"
                />
                <YAxis 
                  yAxisId='right'
                  orientation='right'
                  tick={{fontSize: 12, fill: '#6b7280'}}
                  tickFormatter={(v) => `$${v}`}
                  stroke="#a7f3d0"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #d1fae5',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                <Legend 
                  wrapperStyle={{fontSize: '14px'}}
                />
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='sales'
                  stroke='#047857'
                  strokeWidth={2}
                  name='Sales'
                  dot={{r: 4}}
                />
                <Line
                  yAxisId='right'
                  type='monotone'
                  dataKey='revenue'
                  stroke='#34d399'
                  strokeWidth={2}
                  name='Revenue ($)'
                  dot={{r: 4}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticDashboard