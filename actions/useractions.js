"use server"

import Razorpay from "razorpay";
import Payment from "@/app/models/payment";
import connectDb from "@/app/db/connectDb";
import User from "@/app/models/Users";

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();
    let instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.KEY_SECRET,
    });
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    let x = await instance.orders.create(options);
    await Payment.create({oid: x.id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message})
    return x;
}

export const fetchUser = async (username) => {
    await connectDb();
    let user = await User.findOne({username: username});
    if(!user){
        throw new Error("User not found");
    }
    user = user.toObject({flattenObjectIds: true});
    return user;
}

export const fetchPayments = async (username) => {
    await connectDb();
    let p = await Payment.find({to_user: username, done: true}).sort({amount: -1}).lean();
    return p.map(payment => ({
        ...payment,
        _id: payment._id.toString(),
    }));
}

export const updateProfile = async (data, oldUsername) => {
    await connectDb();

    const ndata = Object.fromEntries(data);
    console.log("DATA RECEIVED:", ndata);

    // Check if username is being changed
    if (ndata.username && ndata.username !== oldUsername) {

        // Check whether another user already has this username
        const existingUser = await User.findOne({
            username: ndata.username
        });

        if (existingUser) {
            return {
                error: "Username already exists"
            };
        }
    }

    // Update the user using the OLD username
    await User.updateOne(
        { username: oldUsername },
        { $set: ndata }
    );

    let u = await User.findOne({ username: ndata.username});
    console.log("Updated User:", u);

    return {
        success: true
    };
};

export const fetchUserByEmail = async (email) => {
    await connectDb();

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    return user.toObject({ flattenObjectIds: true });
};