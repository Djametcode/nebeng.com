import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

interface Ichat {
    chatId: Types.ObjectId
}

interface Iorder {
    orderId: Types.ObjectId
}

enum Gender {
    Male = "Laki - Laki",
    Female = "Perempuan"
}

interface IUser {
    username: string;
    address: string;
    balance: number;
    email: string;
    password: string;
    avatar: string;
    gender: Gender;
    order: Iorder[];
    chat: Ichat[];
    phone: number
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    address: {
        type: String,
        required: [true, 'Please provide your address']
    },
    balance: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        enum: Object.values(Gender),
        required: [true, 'Please provide gender']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],

    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    avatar: {
        type: String,
        default: ""
    },
    order: [
        {
            orderId: {
                type: Schema.Types.ObjectId,
                ref: 'Order'
            }
        }
    ],
    chat: [
        {
            chatId: {
                type: Schema.Types.ObjectId,
                ref: 'Chat'
            }
        }
    ],
    phone: {
        type: Number,
        required: [true, 'Please provide phone number']
    }
})

export const userModel = mongoose.model('User', userSchema)