const { makeRequest } = require('../remake/Request');

const getTodos = async (req, res) => {
    try {
        const { userID } = req.params;
        const data = await makeRequest(
            `https://gorest.co.in/public/v2/todos/${userID}`,
            'GET',
            null,
        );

        res.status(201).json(data);
    } catch (error) {
        res.status(404).send('Server Error');
    }
};

const createTodos = async (req, res) => {
    const { user_id: userId, title, due_on: dueOn, status } = req.body;
    try {
        const data = await makeRequest('https://gorest.co.in/public/v2/todos', 'POST', {
            user_id: userId,
            title,
            due_on: dueOn,
            status,
        });
        res.status(201).json(data);
    } catch (error) {
        res.status(404).send('Server Error in POST request');
    }
};

module.exports = {
    getTodos,
    createTodos,
};
