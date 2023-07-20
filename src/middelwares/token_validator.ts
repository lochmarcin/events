import { validateToken } from '../serices/jwt_service'
import { ReqNotValidated } from '../exceptions/reqNotValidated.exception'

const tokenValidator = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (token && await validateToken(token)) {
            console.log("User validated !")
            return next()
        }
        else {
            throw new ReqNotValidated()
        }
    } catch (error) {
        res.status(error.code || 401).send(error.returnMessage || "Unauthorized")
    }
}

export { tokenValidator }