import { Request, Response } from "express";
import { driverModel } from "../model/driverModel";
import { hashPassword } from "../utils/passwordHash";
import { passwordCompare } from "../utils/passwordCompare";
import { jwtTokenGenerator } from "../utils/jwtGenerator";

export const registerDriver = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, phone } = req.body;
    const requiredFields = ["email", "password", "firstName", "lastName", "phone"];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ msg: `please fill ${field}` })
        }
    }

    try {
        const driverExist = await driverModel.findOne({ email: email });

        if (driverExist) {
            return res.status(400).json({ msg: "email already used" })
        }

        const hashedPassword = await hashPassword(password);
        console.log(hashPassword);

        const driverPhone = String(phone);

        if (!driverPhone.startsWith("08")) {
            return res.status(400).json({ msg: "please fill phone number starts with 08" });
        }

        if (driverPhone.length >= 13) {
            return res.status(400).json({ msg: "max phone number length is 13" })
        }

        const formattedPhone = "+62" + driverPhone.slice(1, driverPhone.length - 1);
        console.log(formattedPhone)


        const driverBlueprint = new driverModel({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            phone: formattedPhone
        })

        const driver = await driverModel.create(driverBlueprint);

        return res.status(200).json({ msg: "success", driver })
    } catch (error) {
        console.log(error)
    }
}

export const loginDriver = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ msg: "please provide email" })
        }

        const driverExist = await driverModel.findOne({ email: email })

        if (!driverExist) {
            return res.status(404).json({ msg: "driver not regsitered" })
        }

        const isPassCorrect = await passwordCompare(password, driverExist.password);
        console.log(isPassCorrect)

        if (!isPassCorrect) {
            return res.status(401).json({ msg: "password wrong" })
        }

        const token = jwtTokenGenerator({
            userId: driverExist._id.toString(),
            email: driverExist.email
        })

        return res.status(200).json({ msg: "successs", driverExist, token })
    } catch (error) {

        console.log(error)
    }
}