import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchTransactionsByUser,
  updateTransactionStatus,
} from "../../store/TransactionSlice";
import { CiEdit } from "react-icons/ci";
import TransactionDetails from "../TransactionDetails";

const transactionStatusData = {
  pending: "PENDING",
  completed: "COMPLETED",
  failed: "FAILED",
};

const TransactionList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { transactionData } = useSelector((state) => state.transactions);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [openDetailspopup, setOpenDetailspopup] = useState(false);
  const localUser = JSON.parse(localStorage.getItem("transactionUser"));

  useEffect(() => {
    dispatch(fetchTransactionsByUser(localUser?.id));
  }, [dispatch, localUser?.id]);

  const changeColor = (type) => {
    switch (type) {
      case transactionStatusData.pending:
        return "orange";
      case transactionStatusData.completed:
        return "green";
      case transactionStatusData.failed:
        return "red";
      default:
        return "black";
    }
  };

  const openPopup = (transaction) => {
    setSelectedTransaction(transaction);
    setNewStatus(transaction.status);
  };

  const closePopup = () => {
    setSelectedTransaction(null);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    if (selectedTransaction) {
      dispatch(
        updateTransactionStatus({
          id: selectedTransaction._id,
          status: newStatus,
        })
      ).then((response) => {
        if (response?.payload?.status === "success") {
          toast.success(response?.payload?.message);
          dispatch(fetchTransactionsByUser(localUser?.id));
        }
      });
      closePopup();
    }
  };

  const closeDetailsPopup = () => {
    setOpenDetailspopup(false);
  };

  const onClickEachTransaction = (id) => {
    setOpenDetailspopup(true);
  };

  return (
    <div className="bg-white px-6 py-4 mt-4">
      <h2 className="text-xl font-bold tracking-wider mb-3">
        Transaction History
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4  bg-gray-100 p-4 rounded-lg">
        <li className="font-bold text-gray-700 hidden md:block">
          Transaction ID
        </li>
        <li className="font-bold text-gray-700 hidden md:block">Amount</li>
        <li className="font-bold text-gray-700 hidden md:block">
          Transaction Type
        </li>
        <li className="font-bold text-gray-700 hidden md:block">
          Transaction Status
        </li>
        <li className="font-bold text-gray-700 text-center hidden md:block">
          Edit
        </li>

        {transactionData?.transactions?.map((eachTransaction) => (
          <div
            key={eachTransaction._id}
            className="contents cursor-pointer"
            onClick={() => {
              onClickEachTransaction(eachTransaction._id);
            }}
          >
            <li className="py-2 font-bold">{eachTransaction._id}</li>
            <li className="py-2 font-bold">{eachTransaction.amount}</li>
            <li className="py-2 font-bold">
              {eachTransaction.transactionType}
            </li>
            <li
              className={`py-0 h-10 px-2 flex items-center justify-center w-full md:w-28 text-white rounded-md`}
              style={{ backgroundColor: changeColor(eachTransaction.status) }}
            >
              {eachTransaction.status}
            </li>
            <li className="py-2 text-center">
              <button
                className="text-lg hover:outline-none outline-none hidden md:block bg-gray-100"
                onClick={(event) => {
                  openPopup(eachTransaction);
                  event.stopPropagation();
                }}
              >
                <CiEdit />
              </button>
              <button
                className="bg-violet-200 w-full md:hidden"
                onClick={(event) => {
                  openPopup(eachTransaction);
                  event.stopPropagation();
                }}
              >
                Edit
              </button>
            </li>
            <hr className="md:hidden" />
          </div>
        ))}
      </ul>

      {openDetailspopup && (
        <TransactionDetails
          closeDetailsPopup={closeDetailsPopup}
          transaction={transactionData}
        />
      )}

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-96">
            <h3 className="text-lg font-bold mb-4">Edit Transaction</h3>
            <div className="mb-4">
              <p className="font-bold">Transaction ID:</p>
              <p>{selectedTransaction._id}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Amount:</p>
              <p>{selectedTransaction.amount}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Transaction Type:</p>
              <p>{selectedTransaction.transactionType}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="font-bold block mb-1">
                Update Status:
              </label>
              <select
                id="status"
                value={newStatus}
                onChange={handleStatusChange}
                className="w-full p-2 border rounded-md"
              >
                <option value={transactionStatusData.pending}>Pending</option>
                <option value={transactionStatusData.completed}>
                  COMPLETED
                </option>
                <option value={transactionStatusData.failed}>Failed</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg mr-2"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleUpdateStatus}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
