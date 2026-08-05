import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutHook } from '@/hooks/user.hook'
import { useUserStore } from '@/store/userStore'
import { ShoppingCart } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const clearUser = useUserStore((state) => state.clearUser)
  const {mutate} = useLogoutHook()
    
  const logoutHandler = () => {
    mutate()
    clearUser()
  }

  return (
    <nav className='sticky top-0 z-50 bg-white border-b border-emerald-100 shadow-sm'>
      <div className='max-w-[1400px] mx-auto px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <Link to={'/'} className='text-2xl font-bold text-emerald-700 tracking-tight'>
            DCom
          </Link>
          <div className='hidden md:flex items-center gap-8'>
            <Link 
              to={'/'} 
              className='text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors duration-200'
            >
              Home
            </Link>
            <Link 
              to={'/product'} 
              className='text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors duration-200'
            >
              Products
            </Link>
            <Link 
              to={'/order'} 
              className='text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors duration-200'
            >
              Orders
            </Link>
          </div>

          <div className='flex items-center gap-6'>
          
            <button 
              onClick={() => navigate('/cart')} 
              className='relative p-2 hover:bg-emerald-50 rounded-lg transition-colors duration-200'
              aria-label='Shopping cart'
            >
              <ShoppingCart className='w-5 h-5 text-gray-700' />
              {user?.cartItem?.length > 0 && (
                <span className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-emerald-700 rounded-full'>
                  {user.cartItem.length}
                </span>
              )}
            </button>
            <Popover>
<PopoverTrigger
  render={
    <button
      className='flex items-center gap-3 hover:bg-emerald-50 rounded-lg p-2 transition-colors duration-200 cursor-pointer'
    >
      <Avatar className='h-8 w-8'>
        <AvatarImage src={user?.profilePhoto} alt={user?.name} />
        <AvatarFallback className='bg-emerald-700 text-white text-sm font-medium'>
          {user?.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className='hidden lg:block text-sm font-medium text-gray-900'>
        {user?.name}
      </span>
    </button>
  }
/>

  <PopoverContent className='w-48 p-2 rounded-lg border border-emerald-100 shadow-sm' align='end'>
                <div className='flex flex-col gap-1'>
                  <Link 
                    to={'/profile'} 
                    className='px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200'
                  >
                    Profile
                  </Link>
                  
                  {user?.owner && (
                    <button 
                      onClick={() => navigate('/dashboard')} 
                      className='px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200 text-left'
                    >
                      Dashboard
                    </button>
                  )}
                  
                  <button 
                    onClick={logoutHandler} 
                    className='px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 text-left'
                  >
                    Logout
                  </button>
                </div>
               </PopoverContent>
</Popover>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar