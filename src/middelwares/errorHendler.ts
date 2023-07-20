const errorHendlerMiddleware = () => {
    return async (res, next) => {
        try {
            console.log("errorHendler ELO!")
            return await next()
        } catch (error) {
            if (typeof error.getErrorDetails === 'function') {
                const { code, message } = error.getErrorDetails()
                res.status(code).send(message)
            }
            else {
                res.status(500).send(`Internal Server Error`)
            }
        }
    }
}

export { errorHendlerMiddleware }