import bcrypt from 'bcrypt'

export const hashPassword = async (pass: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(pass, salt)

        return hashedPass;
    } catch (error) {
        console.log(error)
    }
}