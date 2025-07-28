const express = require('express');
const router = express.Router();
const db = require('./db');

// CREATE
router.post('/users', async (req , res) => {
    const { name, email } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO users (name, email) VALUES (?, ?)', [name, email]
        );
        res.send({ message: 'Success', result });
    } catch (err) {
        res.status(500).send(err);
    }
});

//READ
router.get('/users', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
});

//UPDATE
router.put('/users/:id', async (req, res) => {
  const {name, email} = req.body;
  try{
      db.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id])
      res.send({id: req.params.id.name,email})
    }catch (err){
      res.status(500).send(err)
    }
})

//DELETE
router.delete('/users/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.send({ message: "User Deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
