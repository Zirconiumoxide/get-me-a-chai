"use server"

import Razorpay from "razorpay";
import Payment from "@/app/models/payment";
import connectDb from "@/app/db/connectDb";
import User from "@/app/models/Users";

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();
    let user = await User.findOne({username: to_username});
    const secret = user.razorpaySecret;
    let instance = new Razorpay({
        key_id: user.razorpayId,
        key_secret: secret,
    });
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    let x = await instance.orders.create(options);
    await Payment.create({oid: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message})
    return x;
}

export const fetchUser = async (username) => {
    await connectDb();

    let user = await User.findOne({ username: username});

    if (!user) {
        return null; // Return null if user is not found
    }

    return user.toObject({ flattenObjectIds: true });
};

export const fetchPayments = async (username) => {
    await connectDb();
    let p = await Payment.find({to_user: username, done: true}).sort({amount: -1}).lean();
    return p.map(payment => ({
        ...payment,
        _id: payment._id.toString(),
    }));
}

export const updateProfile = async (data, email) => {
    await connectDb();

    const ndata = Object.fromEntries(data);

    // Find the user using their email
    const user = await User.findOne({ email });

    if (!user) {
        return { error: "User not found" };
    }

    // Check whether username is being changed
    if (user.username !== ndata.username) {
        const existingUser = await User.findOne({
            username: ndata.username
        });

        if (existingUser) {
            return { error: "Username already exists" };
        }

        // Update payments referring to the old username
        await Payment.updateMany(
            { to_user: user.username },
            { $set: { to_user: ndata.username } }
        );
    }

    // Don't allow the client to change the email used to identify the account
    delete ndata.email;

    await User.updateOne(
        { email },
        { $set: ndata }
    );

    return { success: true };
};

export const fetchUserByEmail = async (email) => {
    await connectDb();

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    return user.toObject({ flattenObjectIds: true });
};