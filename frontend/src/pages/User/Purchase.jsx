import { useCreateSuccessHook } from '@/hooks/payment.hook';
import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Package, Home, ArrowRight } from 'lucide-react';

const Purchase = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();

  const { mutate, isSuccess, isPending } = useCreateSuccessHook();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (sessionId) {
      mutate(sessionId);
    }
  }, [searchParams, mutate]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isPending ? (
          <div className="bg-white rounded-lg shadow-sm border border-emerald-100 p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-100 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  Confirming your payment
                </h2>
                <p className="text-sm text-gray-500">
                  Please wait while we process your order
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-emerald-100 overflow-hidden">
            <div className="bg-emerald-50 border-b border-emerald-100 p-8 flex justify-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-700" />
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Payment Completed!
                </h1>
                <p className="text-gray-600">
                  Your order has been successfully placed and confirmed.
                </p>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-emerald-700 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      What's Next?
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      You'll receive a confirmation email with your order details and tracking information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link to="/" className="block">
                  <button className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm">
                    <Home className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>
                </Link>

                <Link to="/order" className="block">
                  <button className="w-full h-11 border border-emerald-100 hover:bg-emerald-50 text-gray-700 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                    <span>View My Orders</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              {isSuccess && (
                <div className="text-center pt-2">
                  <p className="text-xs text-gray-400">
                    Redirecting to home page in 3 seconds...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchase;