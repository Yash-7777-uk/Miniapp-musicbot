const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const { url, user_id, temp_room } = req.query;

    if (!url || !user_id || !temp_room) {
        return res.status(400).send("Missing parameters!");
    }

    res.send(`
        <html>
        <head>
            <title>Music Player</title>
        </head>
        <body>
            <h1>Now Playing</h1>
            <audio controls autoplay>
                <source src="${url}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <p>User ID: ${user_id}</p>
            <p>Room ID: ${temp_room}</p>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Music Player running on http://localhost:3000");
});