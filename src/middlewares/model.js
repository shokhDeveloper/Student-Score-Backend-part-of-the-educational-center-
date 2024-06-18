import { ClientError } from "#error";

export const model = (req, res, next) => {
    req.validate = function(Validator, values) {
        if(Validator.validate(values).error instanceof Error) throw new ClientError(400, Validator.validate(values).error.message);
        return values
    }    
    return next();
}