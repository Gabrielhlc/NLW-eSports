import express from 'express';
const app = express();
app.get('/ads', (req, res) => {
    return res.send([
        { id: 1, username: "gabriel" }
    ]);
});
app.listen(3333);
