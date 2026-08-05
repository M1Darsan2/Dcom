import { Spinner } from '@/components/ui/spinner'
import { useLoginHook } from '@/hooks/user.hook'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
    const { register, handleSubmit} = useForm()
    const {mutate, isPending} = useLoginHook()
    const [showPassword, setShowPassword] = useState(false)

    const loginHandler=(data)=>{
        mutate(data)
    }
  return (
    <div className='h-screen w-full flex items-center justify-center bg-emerald-50 px-4'>
        <form onSubmit={handleSubmit(loginHandler)} className='flex flex-col gap-5 w-full max-w-sm p-8 bg-white rounded-xl border border-emerald-100 shadow-md'>
            <div className='flex flex-col items-center gap-1 mb-1'>
                <Link to={'/'} className='text-2xl font-bold text-emerald-700 tracking-tight'>
                    DCom
                </Link>
                <h1 className='text-xl font-semibold text-gray-900 mt-2'>Welcome Back</h1>
                <p className='text-sm text-gray-500'>Login to your account</p>
            </div>
            <div className='flex flex-col w-full gap-4'>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type="text"
                        placeholder='you@example.com'
                        className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400'
                        {...register('email')}
                    />
                </div>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-sm font-medium text-gray-700'>Password</label>
                    <div className='relative flex items-center'>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter your password'
                            className='w-full border border-gray-200 rounded-lg px-3 py-2 pr-9 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400'
                            {...register('password')}
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='absolute right-3 text-gray-400 hover:text-gray-700 transition-colors duration-200'
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
            </div>
            <button
                type='submit'
                disabled={isPending}
                className='w-full py-2.5 rounded-lg bg-emerald-700 text-white font-medium text-sm hover:bg-emerald-800 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center mt-1'
            >
                {isPending ? <Spinner/> : "Login"}
            </button>
            <p className='text-sm text-gray-500 text-center'>
                Don't have an account?{' '}
                <Link to={'/register'} className='text-emerald-700 font-medium hover:underline'>
                    Register
                </Link>
            </p>
        </form>
    </div>
  )
}

export default Login