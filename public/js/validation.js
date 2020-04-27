//Validation information
const Joi = require('joi');

//check if register information is correct
const registerValidation = data => {
    const schema = {
        name: Joi.string()
            .min(4)
            .max(20)
            .required()
            .error(()=>{
                return{
                    message:"名字長度為4到20個字元"
                }
            }),
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(20)
            .required()
            .error(()=>{
                return{
                    message:"密碼長度為6到20個字元"
                }
            }),
        repassword:Joi.string()
            .min(6)
            .max(20)
            .required()
            .error(()=>{
                return{
                    message:"密碼長度為6到20個字元"
                }
            }),

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
            .max(30)
            .error(()=>{
                return{
                    message:"名字長度為3到30個字元"
                }
            }),
        password: Joi.string()
            .min(3)
            .max(15)
            .required()
            .error(()=>{
                return{
                    message:"密碼長度為3到15個字元"
                }
            }),
    };
    return Joi.validate(data, schema);
};
const passwordValidation = data =>{
  const schema= {
    old_password:Joi.string()
        .required()
        .min(6)
        .max(20)
        .error(()=>{
            return{
                message:"密碼長度為6到20個字元"
            }
        }),
    new_password:Joi.string()
        .required()
        .min(6)
        .max(20)
        .error(()=>{
            return{
                message:"密碼長度為6到20個字元"
            }
        }),
  };
  return Joi.validate(data,schema);
};


module.exports.registerValidation =registerValidation;
module.exports.loginValidation =loginValidation;
module.exports.sessionValidation =sessionValidation;
module.exports.passwordValidation =passwordValidation;


