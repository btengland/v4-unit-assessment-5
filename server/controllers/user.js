const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const { username, password, profile_pic } = req.body
        const db = req.app.get('db')
        const result = await db.getUser([username])
        const existingUser = result[0]
        if (existingUser) {
            return res.status(409).send('Username taken')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const registeredUser = await db.create_user([username, profile_pic, hash])
        const user = registeredUser[0]
        req.session.user = { username: user.username, id: user.id, profile_pic: `https://robohash.org/${username}.png` }
        return res.status(201).send(req.session.user)
    },

    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')
        const foundUser = await db.getUser([username])
        const user = foundUser[0]
        if (!user) {
            return res.status(401).send('Incorrect information')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash)
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect information')
        }
        req.session.user = { username: user.username, id: user.id, profile_pic: `https://robohash.org/${username}.png` }
        return res.send(req.session.user)
    },

    logout: (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
    },

    getUser: async (req, res) => {
        if (req.session.user) {
            return res.status(201).send(req.session.user)
        } else {
            res.status(401).send('Please Log In')
        }
    }
}