const db = require('../db')

class UserController {
    async createUser(req, res) {
        const {name} = req.body
        const score = 0
        const newPerson = await db.query(`INSERT INTO person (name, score) values ($1, $2) RETURNING *`, [name, score])
        res.json(newPerson.rows)
    }
    async getUsers(req, res) {
        const users = await db.query(`SELECT * FROM person`)
        res.json(rows)
    }
    async getOneUser(req, res) {
        const id = req.params.id 
        const user = await db.query(`SELECT * FROM person where id = $1`, [id])
        res.json(user.rows[0])
    }
    async updateUser(req, res) {
        const {id, score} = req.body
        const user = await db.query('UPDATE person set score = $1 where id = $2', [score, id])
        res.json(user.rows[0])
    }
}