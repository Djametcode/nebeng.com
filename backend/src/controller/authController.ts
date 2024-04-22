import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import { hashPassword } from "../utils/passwordHash";
import { passwordCompare } from "../utils/passwordCompare";
import { jwtTokenGenerator } from "../utils/jwtGenerator";

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password, address, gender } = req.body;
    const requiredFields = ['username', 'email', 'password', 'address', 'gender']

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ msg: `Please fill ${field}` })
        }
    }

    try {
        const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] })

        if (user) {
            return res.status(400).json({ msg: "username or email already used" })
        }

        if (!password) {
            return res.status(400).json({ msg: "Please fill password" })
        }

        const hashedPassword = await hashPassword(password);
        console.log(hashedPassword)


        if (gender !== "Laki - Laki" && gender !== 'Perempuan') {
            return res.status(400).json({ msg: "LGBT not allowed go to hell" })
        }

        const userBlueprint = new userModel({
            username: username,
            email: email,
            password: hashedPassword,
            gender: gender,
            address: address
        })

        const newUser = await userModel.create(userBlueprint);

        return res.status(200).json({ msg: "success register", newUser })

    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ msg: "Please fill email" })
    }

    try {
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: "email not registered" })
        }

        if (!password) {
            return res.status(400).json({ msg: "please fill password" })
        }

        const isPassMatch = await passwordCompare(password, user.password)
        console.log(isPassMatch)

        if (!isPassMatch) {
            return res.status(401).json({ msg: "password wrong" })
        }

        const token = jwtTokenGenerator({
            userId: user._id.toString(),
            email: user.email,
            username: user.username
        })

        return res.status(200).json({ msg: "success login", user, token })

    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })

    }
}