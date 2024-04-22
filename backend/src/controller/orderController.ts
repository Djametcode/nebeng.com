import { Request, Response } from "express"
import { userModel } from "../model/userModel"
import { orderModel } from "../model/orderModel"
import { servicesModel } from "../model/servicesModel"

export const createOrder = async (req: Request, res: Response) => {
    const { typeOrder, latitude, longitude, cashOnDelivery } = req.body
    const requiredFields = ["typeOrder", "total", "createdBy", "createdDate", "latitude", "longitude", "cashOnDelivery"]

    for (const filed of requiredFields) {
        if (!req.body[filed]) {
            return res.status(400).json({ msg: `Please fill ${filed}` })
        }
    }
    const userId = req.user.userId;

    try {
        const user = await userModel.findOne({ _id: userId });
        const servicesSelected = await servicesModel.findOne({ _id: typeOrder });

        if (!user) {
            return res.status(401).json({ msg: "user not founde or token invalid" })
        }

        const totalOrder = servicesSelected?.price;

        const orderBlueprint = new orderModel({
            typeOrder: typeOrder,
            total: totalOrder,
            createdBy: user._id,
            location: {
                latitude: latitude,
                longitude: longitude,
            },
            cashOnDelivery: cashOnDelivery

        })

        const order = await orderModel.create(orderBlueprint);
        user.order.push({ orderId: order._id })
        await user.save()

        return res.status(200).json({ msg: "success", order })
    } catch (error) {
        console.log(error)
    }
}

export const cancleOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        const order = await orderModel.findOne({ _id: id })
        const checkOrderOwner = order?.createdBy.toString() === userId;

        if (!checkOrderOwner) {
            return res.status(401).json({ msg: "Please login with correct account" })
        }

        const deletedOrder = await orderModel.findOneAndDelete({ _id: id })
        const orderIndex = user.order.findIndex((item) => item.orderId === deletedOrder?._id);
        console.log(orderIndex)

        if (orderIndex !== -1) {
            user.order.splice(orderIndex, 1)
            await user.save();

            return res.status(200).json({ msg: "order successfully canceled" })
        }

        return res.status(400).json({ msg: "order already cancled" })
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderModel.find({ isComplete: false });

        return res.status(200).json({ msg: "success", order })
    } catch (error) {
        console.log(error)
    }
}