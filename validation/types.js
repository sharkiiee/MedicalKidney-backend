const zod = require("zod");

const createUser = zod.object({
    username:zod.string().email(),
    password:zod.number().min(6)
})

module.exports = {
    createUser
}