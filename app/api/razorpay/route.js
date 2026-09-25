import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDb from "@/app/db/connectDb";
import Payment from "@/app/models/payment";
import Razorpay from "razorpay";
import User from "@/app/models/Users";

export const POST = async (request) => {
    await connectDb();
    let body = await request.formData();
    body = Object.fromEntries(body);
    let p = await Payment.findOne({oid: body.razorpay_order_id});
    if(!p){
        return NextResponse.json({error: "Payment not found"}, {status: 404});
    }
    //fetch the user who is receiving the payment
    let u = await User.findOne({username: p.to_user});
    const secret = u.razorpaySecret

    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret);
    if(xx){
        const updatedPayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done: true}, {new: true});
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
    }else{
        return NextResponse.json({error: "Payment verification failed"}, {status: 400});
    }
}