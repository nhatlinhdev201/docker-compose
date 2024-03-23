const express = require('express');

const app = express();
const { query } = require('./data.js');
const PORT = process.env.PORT || 9999;

app.use(express.json());

app.post('/api/books', async (req, res) => {
    const { title, author } = req.body;
    console.info(`Adding book with title ${title} by author ${author}`);

    const result = await query(
        'INSERT INTO tblbook (title, author) VALUES (?, ?)',
        [title, author],
    );

    res.json({ id: result.insertId });
});

app.get('/api/books', async (req, res) => {
    console.info(`Getting all books`);

    const books = await query('SELECT * FROM tblbook');
    res.json(books);
});

app.listen(PORT, () =>
    console.info(`Server started listening on port ${PORT}`),
);
