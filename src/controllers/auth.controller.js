const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')

const register = async(req, res) => {
    const { username, email, password } = req.body
    //creamos el objeto del nuevo usuario
    const user = new User({
        username: username,
        email: email,
        password: password
    });
    //hasheamos el pswd del usuario
    user.password = await user.encryptPassword(user.password)
    //guardamos en db el nuevo usuario
    await user.save()
    //hacemos el uso de jwt para la sesion del usuario
    const token = jwt.sign({id: user._id}, config.secret, {
        //configuracion para la duracion del token(24 horas)
        expiresIn: 60 * 60 * 24
    })
    res.send({
        auth: true,
        token: token
    })
};

const profile =  async(req, res) => {
    //comprobamos que el usuario exista
    const user = await User.findById(req.userId, {password: 0, _id: 0, __v: 0})
    if(!user){
        return res.status(401).send('User not found')
    }
    
    //si existe retornamos el usuario
    res.json(user)
}

const login = async(req, res) => {
    const {email, password} = req.body
    //comprobamos si el email existe
    const user = await User.findOne({email: email})
    if(!user){
        return res.status(404).send('Email not exists')
    }
    //comprobamos la pswd(si es correcta retorna true)
    const validPassword = await user.validatePassword(password);
    //si la pswd es incorrecta
    if(!validPassword){
        return res.status(401).json({auth: false, token: null})
    }
    //retornamos un token para la sesion del usuario
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    })

    res.json({auth: true, token: token})
}



module.exports = {
    register,
    login,
    profile
}