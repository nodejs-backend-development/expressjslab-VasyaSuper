const token = '0c750f057267c2ceab4f1297b90313062aa0cb4f93a0f2ba8a5de4c64bea68c5';

const makeRequest = async (url, method, data) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: data ? JSON.stringify(data) : null,
        });
        if (response.status === 404) {
            throw new Error('Data not found');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
module.exports = {
    makeRequest,
};
