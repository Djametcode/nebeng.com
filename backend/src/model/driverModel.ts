import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

interface IcompleteOrder {
    orderId: Types.ObjectId;
    comment: string;
    rating: number
}

interface Idriver {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
    orderComplete: IcompleteOrder[];
    rating: number;
    balance: number;
    phone: string;
    isVerifed: boolean
}

const driverSchema = new Schema<Idriver>({
    email: {
        type: String,
        required: [true, "please fill email"],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, "please fill password"]
    },
    firstName: {
        type: String,
        required: [true, "please provide first name"]
    },
    lastName: {
        type: String,
        required: [true, "please provide last name"]
    },
    avatar: {
        type: String,
        default: ""
    },
    orderComplete: [{
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order"
        },
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 0
        }
    }],
    balance: {
        type: Number,
        default: 0
    },
    phone: {
        type: String,
        required: [true, 'Please provide phone number']
    },
    isVerifed: {
        type: Boolean,
        default: false
    }
})

export const driverModel = mongoose.model('Driver', driverSchema)