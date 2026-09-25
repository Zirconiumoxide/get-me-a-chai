"use client";

import React from "react";
import Script from "next/script";
import { initiate, fetchUser, fetchPayments } from "@/actions/useractions.js";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const PaymentPage = ({ username }) => {
  const [paymentForm, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setPaymentForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getData = async (params) => {
    let u = await fetchUser(username);
    setCurrentUser(u);
    let dbpayments = await fetchPayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    const updatedPaymentForm = {
      ...paymentForm,
      amount: amount,
    };
    let a = await initiate(amount, username, updatedPaymentForm);
    let orderId = a.id;
    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits.
      currency: "INR",
      name: "BuyMeAChai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "<name>", //your customer's name
        email: "<email>",
        contact: "<phone>", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full bg-red-50 relative">
        <img
          className="object-cover w-full h-[350] "
          src={currentUser.coverPic}
          alt=""
        />
        <div className="absolute -bottom-20 border border-white rounded-full right-[46%]">
          <img
            width={150}
            height={150}
            className="rounded-full"
            src={currentUser.profilePic}
            alt=""
          />
        </div>
      </div>
      <div className="info flex justify-center items-center my-24 w-full flex-col gap-2">
        <div className="text-lg font-bold">@{username}</div>
        <div className="text-slate-400">Creating animated art for VTTs</div>
        <div className="text-slate-400">
          9719 members . 82 posts . 1.2k followers . $15,450/releases
        </div>
        <div className="payments flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg p-10 text-white h-[450px] overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className=" mx-5 text-sm">
              {payments.length === 0 && (
                <div className="text-center text-slate-400">
                  No supporters yet. Be the first one to support!
                </div>
              )}
              {payments.map((payment, i) => {
                return (
                  <li key={i} className="my-2 flex gap-2 items-center">
                    <img width={33} src="avatar.gif" alt="" />
                    <span>
                      {payment.name} donated{" "}
                      <span className="font-bold">₹{payment.amount / 100}</span>
                      . {payment.message}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="makePayments w-1/2 bg-slate-900 rounded-lg p-10 text-white">
            <h2 className="text-2xl my-5 font-bold">Make a payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                onChange={handleChange}
                name="name"
                value={paymentForm.name}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                name="message"
                value={paymentForm.message}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                name="amount"
                value={paymentForm.amount}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />
              <button
                type="button"
                onClick={() => {
                  const amount = Number(paymentForm.amount);
                  if (!amount || amount <= 0) {
                    return;
                  }
                  pay(amount * 100);
                }}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5"
              >
                Pay
              </button>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                type="button"
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(1000)}
              >
                Pay ₹10
              </button>
              <button
                type="button"
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(2000)}
              >
                Pay ₹20
              </button>
              <button
                type="button"
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(3000)}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentPage;
