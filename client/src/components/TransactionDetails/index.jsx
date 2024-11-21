import React from "react";

const TransactionDetails = ({ transaction, closeDetailsPopup }) => {
  const {transactions} = transaction;
  return (
    <>
      {transactions?.map((eachTransaction, index) => (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
          key={index}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Transaction Details</h3>
            <div className="mb-4 flex gap-2">
              <p className="font-bold">Transaction ID:</p>
              <p>{eachTransaction._id}</p>
            </div>
            <div className="mb-4 flex gap-2">
              <p className="font-bold">Amount:</p>
              <p>{eachTransaction.amount}</p>
            </div>
            <div className="mb-4 flex gap-2">
              <p className="font-bold">Transaction Type:</p>
              <p>{eachTransaction.transactionType}</p>
            </div>
            <div className="mb-4 flex gap-2">
              <p className="font-bold">Status:</p>
              <p>{eachTransaction.status}</p>
            </div>
            <div className="mb-4 flex gap-2">
              <p className="font-bold">Date:</p>
              <p>{new Date(eachTransaction.createdAt).toISOString().split("T")[0]}</p>
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
      ))}
    </>
  );
};

export default TransactionDetails;
