import React from "react";
import { useSelector } from "react-redux";

const TransactionDetails = ({closeDetailsPopup }) => {
  const { transactionDetails } = useSelector((state) => state.transactions);
  console.log(transactionDetails)
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 className="text-lg font-bold mb-4">Transaction Details</h3>
          <div className="mb-4 flex gap-2">
            <p className="font-bold">Transaction ID:</p>
            <p>{transactionDetails?._id}</p>
          </div>
          <div className="mb-4 flex gap-2">
            <p className="font-bold">Amount:</p>
            <p>Rs.{transactionDetails?.amount}</p>
          </div>
          <div className="mb-4 flex gap-2">
            <p className="font-bold">Transaction Type:</p>
            <p>{transactionDetails?.transactionType}</p>
          </div>
          <div className="mb-4 flex gap-2">
            <p className="font-bold">Status:</p>
            <p>{transactionDetails?.status}</p>
          </div>
          <div className="mb-4 flex gap-2">
            <p className="font-bold">Date:</p>
            <p>
              {
                transactionDetails?.createdAt
              }
            </p>
          </div>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-violet-400 text-white rounded-lg"
              onClick={closeDetailsPopup}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetails;
