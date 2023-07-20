import jwt from 'jsonwebtoken'


const createToken = async (userId: number) => {
    console.log("User id from parametr: " + userId)
    const payload = {
        userId: userId
    }
    console.log("Payload: " + payload)

    try {
        const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' })
        return token
    } catch (err) {
        console.log("createToken() " + err)
    }
}

const validateToken = async (token: string) => {
    try {
        const decoded = await jwt.verify(token, process.env.SECRET)
        console.log(decoded)
        return decoded
    } catch (err) {
        console.log("Error at veryfi jwt: " + err)
        return null
    }

}

export {
    createToken,
    validateToken
}