const request = require('supertest');
const app = require('../app');

const url = 'https://gorest.co.in/public/v2';
const token = '0c750f057267c2ceab4f1297b90313062aa0cb4f93a0f2ba8a5de4c64bea68c5';
const { makeRequest } = require('../remake/Request');

require('dotenv').config();

jest.mock('../remake/Request');
const userId = '1';
const user = {
    id: userId,
    user_id: 50000,
    title: 'Vero tubineus amitto rerum velociter atqui nostrum spectaculum curriculum caute.',
    due_on: '2023-04-14T00:00:00.000+05:30',
    status: 'pending',
};
const user2 = {
    user_id: 50001,
    title: 'Viduata placeat aveho terror triumphus recusandae cunctatio valeo vinculum succurro.',
    due_on: '2023-04-14T00:00:00.000+05:30',
    status: 'completed',
};
afterEach(() => {
    jest.clearAllMocks();
});

describe('GET /todos/:userID', () => {
    it('should getTodos by id', async () => {
        makeRequest.mockResolvedValueOnce(user);

        const res = await request(app)
            .get(`/todos/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(201);
        expect(res.body).toStrictEqual(user);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/todos/${userId}`, 'GET', null);
    });

    it('should handle errors getting todos by id', async () => {
        const userIdErr = '2';
        makeRequest.mockRejectedValueOnce(new Error('Todos not found'));

        const res = await request(app)
            .get(`/todos/${userIdErr}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('Server Error');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/todos/${userIdErr}`, 'GET', null);
    });
});

describe('POST /todos', () => {
    it('should create a new Todos', async () => {
        const createdUser = {
            id: '1',
            ...user2,
        };
        makeRequest.mockResolvedValueOnce(createdUser);

        const res = await request(app)
            .post('/todos')
            .send(user2)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(201);
        expect(res.body).toStrictEqual(createdUser);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/todos`, 'POST', user2);
    });

    it('should handle errors create new Todos', async () => {
        makeRequest.mockRejectedValueOnce(new Error('Create failed'));

        const res = await request(app)
            .post('/todos')
            .send(user2)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('Server Error in POST request');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${url}/todos`, 'POST', user2);
    });
});
