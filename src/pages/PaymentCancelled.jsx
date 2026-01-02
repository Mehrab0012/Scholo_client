
import React from 'react';
import { Link } from 'react-router';
import { GiCancel } from "react-icons/gi";


const PaymentCancelled = () => {



  return (
    <div className="flex min-h-screen flex-col  selection:bg-[#137fec] ">


      {/* Main Content */}
      <main className="flex grow items-center justify-center px-4 py-12">
        <div className="w-full max-w-[540px] rounded-xl border border-slate-100 bg-white p-8 shadow-xl sm:p-14 transition-all">
          <div className="flex flex-col items-center">
            {/* Cancellation Icon */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <span className="material-symbols-outlined text-[52px] font-light text-red-500">
                <GiCancel />
              </span>
            </div>

            {/* Content Text */}
            <div className="mb-10 text-center">
              <h1 className="font-display mb-3 text-3xl font-bold tracking-tight text-[#111418]">
                  Payment cancelled
              </h1>
              <p className="mx-auto max-w-[420px] text-base leading-relaxed text-slate-600">
                Your scholarship application fee payment was not processed. No charges were made to your account. This may be because the transaction was cancelled or declined.
              </p>
            </div>

            {/* Interaction Buttons */}
            <div className="flex w-full flex-col gap-3">


              <Link to={'/'}>
                <button

                  className="h-14 w-full rounded-lg border border-slate-200 bg-transparent px-6 font-display text-base font-bold text-[#111418] transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]"
                >
                  Return to Dashboard
                </button>
              </Link>
            </div>

            
          </div>
        </div>
      </main>


    </div>
  );
};

export default PaymentCancelled;
