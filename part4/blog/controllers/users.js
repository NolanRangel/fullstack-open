const usersRouter = require('express').Router()
const User = require('../models/user')
const { hash } = require("bcrypt");
const { error} = require("../utils/logger");



usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })
    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch {
        next(error)
    }

})


module.exports = usersRouter