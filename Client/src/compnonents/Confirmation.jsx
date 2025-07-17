import { Link } from "react-router";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";


const Confirmation = () => {
 const [isLoading, setisLoading] = useState(true)

 setTimeout(()=>{
  setisLoading(false)
 }, 5000)
 

  return (
   <div>
    { isLoading && <div className="flex h-screen flex-col items-center justify-center bg-[#f4f4f4] text-center">
      <FaSpinner className="mb-4 animate-spin text-5xl text-[#fe5156]" />
      <h2 className="text-2xl font-semibold text-gray-700">Processing your order...</h2>
      <p className="text-gray-500 mt-2">Please wait while we confirm your purchase.</p>
    </div>}
   {!isLoading && ( <div className="flex min-h-screen items-center justify-center bg-[#f4f4f4] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-6 h-28 w-28">
          <img src="/images/check.jpg" alt="" />
        </div>
        <h2 className="mb-2 text-2xl font-extrabold text-gray-800">
          Order Confirmed!
        </h2>
        <p className="mb-2 text-gray-600">
          Order ID: {Date.now()}
        </p>
        <p className="mb-6 text-gray-600">
          Thank you for your purchase. We've received your order and will
          process it soon.
        </p>
        <Link
          to="/"
          className="inline-block rounded border-2 border-green-600 px-6 py-3 font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
        >
          Continue Shopping
        </Link>
      </div>
    </div>)}
   </div>
  );
};

export default Confirmation;
