import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

enum ItypeOrder {
    Ride = "ojek",
    Food = "makanan",
    Drink = 'minuman',
    Delivery = 'kirim'
}

interface Itaken {
    istTaken: boolean,
    takenBy: Types.ObjectId
}

interface IorderDetail {
    typeOrder: ItypeOrder,
    total: number,
    createdBy: Types.ObjectId,
    createdDate: Date,
    isTaken: Itaken[],
    location: {
        latitude: number,
        longitude: number
    }
}

const orderSchema = new Schema<IorderDetail>({
    typeOrder: {
        type: String,
        enum: Object.values(ItypeOrder),
        required: [true, 'Please provide type order']
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
    }
})