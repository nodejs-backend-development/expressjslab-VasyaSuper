const { makeRequest } = require('../remake/Request');

const getTodos = async (req, res) => {
    try {
        const { userID } = req.params;
        const data = await makeRequest(
            `https://gorest.co.in/public/v2/todos/${userID}`,
            'GET',
            null,
        );
        // const data = await response.json();
        res.status(201).json(data);
    } catch (error) {
        res.status(404).send('Server Error');
    }
};

const createTodos = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', async () => {
        const { user_id, title, due_on, status } = JSON.parse(body);
    try {
        const data = await makeRequest('https://gorest.co.in/public/v2/todos', 'POST', {
            user_id,
            title,
            due_on,
            status,
        });
        res.status(201).json(data);
    } catch (error) {
        res.status(404).send('Server Error in POST request');
    }});
};

module.exports = {
    getTodos,
    createTodos,
};
