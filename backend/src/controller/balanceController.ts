import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import { driverModel } from "../model/driverModel";

export const addBalance = async (req: Request, res: Response) => {
    const { topUpNominal, payment } = req.body;

    const userId = req.user.userId
    const driverId = req.driver.driverId
    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            const driver = await driverModel.findOne({ _id: driverId })

        }
    } catch (error) {
        console.log(error)
    }
}