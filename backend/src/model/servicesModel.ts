import mongoose from "mongoose";
import { ItypeOrder } from "./orderModel";
const { Schema } = mongoose

interface Iservices {
    type: ItypeOrder;
    price: number;
    isAvailable: boolean;
}

const serviceSchema = new Schema<Iservices>({
    type: {
        type: String,
        enum: Object.values(ItypeOrder),
        required: [true, "Please provide type order"]
    },
    price: {
        type: Number,
        required: [true, 'Please provide services price']
    },
    isAvailable: {
        type: Boolean,
        default: true,
    }
})

export const servicesModel = mongoose.model('Services', serviceSchema);