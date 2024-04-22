import bcrpyt from 'bcrypt'

export const passwordCompare = (userInput: string, database: string) => {
    return bcrpyt.compare(userInput, database)
}