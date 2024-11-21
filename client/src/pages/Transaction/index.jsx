import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction, fetchTransactionsByUser } from '../../store/TransactionSlice';
import TransactionList from '../../components/TransactionList';
import { toast } from 'react-toastify';

const Transaction = () => {
  const user = JSON.parse(localStorage.getItem("transactionUser"))
  const [formData,setFormData] = useState({
    amount:"",
    transactionType:"DEPOSIT",
    status:"PENDING"
  });

  const dispatch = useDispatch();

  const onChangeInput = (event)=>{
    const {id,value} = event.target;
    setFormData({
      ...formData,
      [id]:value
    })
  };

  const onSubmitTransactionDetails = (event)=>{
    event.preventDefault();
    dispatch(createTransaction({...formData,userId:user?.id}))
    .then((response)=>{
      console.log(response)
      if(response?.payload?.status==="success"){
        dispatch(fetchTransactionsByUser(user?.id));
        toast.success(response?.payload?.message);
        setFormData({
          amount: "",
          transactionType: "DEPOSIT",
          status: "PENDING",
        });
      }
    })
  }

  return (
    <>
      <div className=" flex flex-col md-flex-row gap-4">
        <div className="bg-white px-10 py-14">
          <h2 className="text-xl font-bold tracking-wider mb-6">Transaction</h2>
          <form onSubmit={onSubmitTransactionDetails}>
            <div className="flex flex-col gap-1 justify-start mb-3">
              <label htmlFor="amount" className="font-bold">
                Amount
              </label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={onChangeInput}
                id="amount"
                placeholder="Enter amount"
                className="bg-gray-100 py-2 px-2 rounded-md outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 justify-start mb-3">
              <label htmlFor="transactionType" className="font-bold">
                Transaction Type
              </label>
              <select
                name="transactionType"
                onChange={onChangeInput}
                value={formData.transactionType}
                id="transactionType"
                className="bg-gray-100 py-2 px-2 rounded-md outline-none"
              >
                <option>DEPOSIT</option>
                <option>WITHDRAWAL</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 justify-start mb-3">
              <label htmlFor="transactionStatus" className="font-bold">
                Transaction Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={onChangeInput}
                id="status"
                className="bg-gray-100 py-2 px-2 rounded-md outline-none"
              >
                <option>PENDING</option>
                <option>COMPLETED</option>
                <option>FAILED</option>
              </select>
            </div>
            <button
              type="submit"
              className="md:px-6 md:py-1 bg-violet-300 md:text-sm text-gray-500 rounded-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <TransactionList/>
    </>
  );
}

export default Transaction;