import Joi from "joi"

const user_first_name = Joi.string().min(3).max(32).required().error(() => new Error("User first name is required !"));
const user_last_name = Joi.string().min(5).max(32).required(() => new Error("User last name is required !"));
const user_username = Joi.string().max(32).required(() => new Error("Username is required !"));
const user_password = Joi.string().max(100).required().error(() => new Error("User password is required !"));
const user_contact = Joi.string().regex(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/).max(12).required().error(() => new Error("Phone number is required !"));
const user_gender = Joi.number().required().error(() => new Error("User gender is required !"));
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