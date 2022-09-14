import express from 'express';

const app = express();

app.get('/ads', (req, res) => {
    return res.send([
        {id: 1, username: "gabriel"},
        {id: 2, username: "geaga"}, 
        {id: 3, username: "geagaaaaa"}
    ])
});

app.listen(3333)