const express = require('express');
const router = express.Router();
const {createUser,findUsers,updateUser,deleteUser,findUserByemail} = require('../controller/userController');

router.post('/', createUser);
router.get('/', findUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:email', findUserByemail);

module.exports = { router };