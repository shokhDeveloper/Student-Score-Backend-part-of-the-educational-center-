import Joi from "joi"

const user_first_name = Joi.string().min(3).max(32).required().error(() => new Error("User first name is required !"));
const user_last_name = Joi.string().min(5).max(32).required(() => new Error("User last name is required !"));
const user_username = Joi.string().max(32).required(() => new Error("Username is required !"));
const user_password = Joi.string().max(100).required().error(() => new Error("User password is required !"));
const user_contact = Joi.string().regex(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/).max(12).required().error(() => new Error("Phone number is required !"));
const user_gender = Joi.number().required().error(() => new Error("User gender is required ! You can only enter values ​​of 1 or 2 (1 = male, 2 = female)"));
const user_role = Joi.number().required().error(() => new Error("User role is required !"));

export const userValidator = Joi.object({
    user_first_name,
    user_last_name,
    user_username,
    user_password,
    user_contact,
    user_gender,
    user_role
});
export const adminValidator = Joi.object({
    user_first_name,
    user_last_name,
    user_username,
    user_password,
    user_gender,
    user_role
});

export const courseValidator = Joi.object({
    course_name: Joi.string().min(5).max(50).required().error(() => new Error("Course name is required and must be non-repeatable !"))
});

export const createValidator = (obj) => {
    const keys = Object.keys(obj);
    let validator = {};

    if(keys.includes("user_first_name")) validator.user_first_name = user_first_name
    
    if(keys.includes("user_last_name")) validator.user_last_name = user_last_name
    
    if(keys.includes("user_username")) validator.user_username = user_username
    
    if(keys.includes("user_role")) validator.user_role = user_role
    
    if(keys.includes("user_contact")) validator.user_contact = user_contact
    
    if(keys.includes("user_password")) validator.user_password = user_password
    
    if(keys.includes("user_gender")) validator.user_gender = user_gender
    
    return Joi.object(validator)
};