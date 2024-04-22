import mongoose, { BooleanExpression, Types } from "mongoose";
const { Schema } = mongoose;

export enum ItypeOrder {
    Ride = "ojek",
    Food = "makanan",
    Drink = 'minuman',
    Delivery = 'kirim'
}

interface Itaken {
    istTaken: boolean,
    takenBy: Types.ObjectId,
    isComplete: boolean
}

interface IorderDetail {
    typeOrder: Types.ObjectId,
    total: number,
    createdBy: Types.ObjectId,
    createdDate: Date,
    isTaken: Itaken[],
    location: {
        latitude: number,
        longitude: number
    },
    cashOnDelivery: boolean,
    isComplete: boolean
}

const orderSchema = new Schema<IorderDetail>({
    typeOrder: {
        type: Schema.Types.ObjectId,
        ref: 'Services'
    },
    total: {
        type: Number,
        required: [true, 'Please provide total order']
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    isTaken: [
        {
            istTaken: {
                type: Boolean,
                default: false
            },
            takenBy: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    location: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
        required: [true, 'Please provide your location']
    },
    cashOnDelivery: {
        type: Boolean,
        default: false,
    },
    isComplete: {
        type: Boolean,
        default: false
    }
})

export const orderModel = mongoose.model('Order', orderSchema);