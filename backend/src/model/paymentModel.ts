import mongoose, { BooleanExpression, Types } from "mongoose";
const { Schema } = mongoose

enum Provider {
    bank = "bank",
    ovo = "ovo",
    gopay = "gopay",
    dana = "dana"
}

enum Epayment {
    topUp = "top Up",
    paymentServices = "bayar"
}

interface Ipayment {
    createdBy: Types.ObjectId;
    typePayment: Epayment;
    total: number;
    provider: Provider;
    isComplete: boolean;
}

const paymentSchema = new Schema<Ipayment>({
    createdBy: {
        type: Schema.Types.ObjectId,
        refPath: 'createdByType'
    }
})