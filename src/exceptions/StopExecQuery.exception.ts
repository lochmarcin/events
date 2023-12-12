class StopExecQuery extends Error {
    private returnMessage: string
    constructor(message: string = "Hit Cache!") {
        super(`${message}`)
        this.returnMessage = message
    }

    getErrorDetails() {
        return {
            message: this.message
        }
    }
}
export { StopExecQuery }