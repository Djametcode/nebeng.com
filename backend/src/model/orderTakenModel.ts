import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

interface ITaken {
    takenBy: Types.ObjectId,
    price: number;
    orderFor: Types.ObjectId
}

const orderTakenSchema = new Schema<ITaken>({
    takenBy: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    orderFor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const orderTakenModel = mongoose.model('OrderTaken', orderTakenSchema)