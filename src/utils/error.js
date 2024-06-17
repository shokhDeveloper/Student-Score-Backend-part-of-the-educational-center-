export class ClientError extends Error {
    constructor(status, message){
        super(message, status)
        this.status = status
        this.message = message
    }
}
export class ServerError extends Error {
    constructor(message){
        super(message)
        this.message = message
        this.status = 500
    }
}
export const globalError = (res, error) => {
    return res.status(error.status || 500).json({message: error.message, statusCode: error.status || 500});
}