import { Pencil } from 'lucide-react'
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
import { useUpdateProfileHook } from '@/hooks/user.hook'
import { Spinner } from '@/components/ui/spinner'
import { useUserStore } from '@/store/userStore'

const Profile = () => {
  const user = useUserStore((state) => state.user)
  const {register, handleSubmit, reset} = useForm()
  const {mutate, isPending} = useUpdateProfileHook()
const [open, setOpen] = useState(false)
  const updateFormHandler = (data) => {
    const formdata = new FormData()
    if(data.name) {
      formdata.append("name", data.name)
    }
    if(data.profilePhoto && data.profilePhoto[0]) {
      formdata.append("profilePhoto", data.profilePhoto[0])
    }
    mutate(formdata, {
      onSuccess: () => {
        reset()
       setOpen(false)
  }})
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='w-full max-w-md p-8 rounded-lg border border-emerald-100 shadow-sm'>
        
        <div className='relative w-32 h-32 mx-auto mb-8'>
          <img 
            src={user?.profilePhoto} 
            className='w-full h-full rounded-full object-cover border border-emerald-100' 
            alt={user?.name} 
          />
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <button className='absolute bottom-0 right-0 p-2 bg-emerald-700 text-white rounded-full hover:bg-emerald-800 transition-colors duration-200 shadow-sm'>
                  <Pencil className='w-4 h-4' />
                </button>
              }
            />
            
            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your name and profile photo
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(updateFormHandler)} className='space-y-4 mt-4'>
                <input 
                  type="text" 
                  placeholder='Name' 
                  className='w-full px-4 py-3 border border-emerald-100 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors duration-200'
                  {...register('name')}
                />
                
                <input 
                  type="file" 
                  accept="image/*"
                  className='w-full px-4 py-3 border border-emerald-100 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-colors duration-200'
                  {...register('profilePhoto')}
                />
                
                <button 
                  type='submit' 
                  disabled={isPending}
                  className='w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center shadow-sm'
                >
                  {isPending ? <Spinner /> : "Update"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* User Info */}
        <div className='text-center space-y-6'>
          <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>{user?.name}</h1>
          
          <div className='space-y-2 text-sm text-gray-600'>
            <p>Account Type: <span className='font-medium text-emerald-700'>{user?.owner ? "Admin" : "Customer"}</span></p>
            <p>Cart Items: <span className='font-medium text-gray-900'>{user?.cartItem?.length || 0}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile