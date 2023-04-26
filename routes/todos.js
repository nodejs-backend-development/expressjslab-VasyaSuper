const express = require('express');
const { getTodos, createTodos } = require('../controllers/todos.controller');

const router = express.Router();

router.get('/:userID', getTodos); // Retrieves post comments GET

router.post('/', createTodos); // Creates a post comment POST

module.exports = router;
