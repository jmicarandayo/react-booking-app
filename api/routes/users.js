import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/Users.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checktoken', verifyToken, (req, res, next) => {
//     res.send('You are logged in')
// })
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send('You are authorized to delete your account')
// })
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send('You are authorized to apply changes to all accounts')
// })

// UPDATE
router.put('/:id', verifyUser, updateUser)

// DELETE
router.delete('/:id',verifyUser, deleteUser)
// GET
router.get('/:id', verifyUser, getUser)
// GET ALL
router.get('/', verifyAdmin, getUsers)

export default router