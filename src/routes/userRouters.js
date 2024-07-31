const express = require('express');
const router = express.Router();
const {createUser,findUsers,findUserById,updateUser,deleteUser} = require('../controller/userController');

router.post('/', createUser);
router.get('/', findUsers);
router.get('/:id', findUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = { router };
