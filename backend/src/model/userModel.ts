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

enum UserType {
    Driver = "Driver",
    Human = "Human",
}

interface IUser {
    username: string;
    userType: UserType;
    address: string;
    balance: number;
    email: string;
    password: string;
    avatar: string;
    gender: Gender;
    order: Iorder[];
    chat: Ichat[];
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    userType: {
        type: String,
        enum: Object.values(UserType),
        required: [true, 'Please provide user type']
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
        required: [true, 'Please provide email']
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
    ]
})

export const userModel = mongoose.model('User', userSchema)