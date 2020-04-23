//Validation information
const Joi = require('joi');

//check if register information is correct
const registerValidation = data => {
    const schema = {
        name: Joi.string()
            .min(4)
            .max(20)
            .required(),
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(15)
            .required(),
        repassword:Joi.string()
            .min(6)
            .max(15)
            .required()
    };
    return Joi.validate(data, schema);
};

//check if log in information is correct
const loginValidation = data => {
    const schema = {
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(15)
            .required()
    };
    return Joi.validate(data,schema);
};
//check if create session information is correct
const sessionValidation = data=>{
    const schema = {
        name: Joi.string()
            .required()
            .min(3)
            .max(30),
        password: Joi.string()
            .min(6)
            .max(15)
            .required()
    };
    return Joi.validate(data, schema);
};
const passwordValidation = data =>{
  const schema= {
    old_password:Joi.string()
        .required()
        .min(6)
        .max(15),
    new_password:Joi.string()
        .required()
        .min(6)
        .max(15)
  };
  return Joi.validate(data,schema);
};


module.exports.registerValidation =registerValidation;
module.exports.loginValidation =loginValidation;
module.exports.sessionValidation =sessionValidation;
module.exports.passwordValidation =passwordValidation;


