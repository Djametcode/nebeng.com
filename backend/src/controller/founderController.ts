import { Request, Response } from "express"
import { servicesModel } from "../model/servicesModel";

export const createServices = async (req: Request, res: Response) => {
    const { type, price } = req.body;

    if (!type || !price) {
        return res.status(400).json({ msg: "services type need to fill" })
    }

    try {
        const servicesBlueprint = new servicesModel({
            type: type,
            price: price
        })
        const services = await servicesModel.create(servicesBlueprint)

        return res.status(200).json({ msg: "success", services })
    } catch (error) {
        console.log(error)
    }
}

export const disableServices = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isAvailable } = req.body
    try {
        const services = await servicesModel.findOneAndUpdate({ _id: id }, { isAvailable: isAvailable }, { new: true });

        if (!services) {
            return res.status(404).json({ msg: "services not found" })
        }

        return res.status(200).json({ msg: "success", services })
    } catch (error) {
        console.log(error)
    }
}

export const updatePriceServices = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { updatePrice } = req.body
    try {
        const services = await servicesModel.findOneAndUpdate({ _id: id }, { price: updatePrice }, { new: true });

        if (!services) {
            return res.status(404).json({ msg: "services not found" })
        }

        return res.status(200).json({ msg: "success", services })
    } catch (error) {
        console.log(error)
    }
}