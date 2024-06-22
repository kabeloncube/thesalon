const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const imagesPath = path.join(__dirname, 'images');

app.use(express.static(__dirname));

app.get('/images', (req, res) => {
    fs.readdir(imagesPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read image directory' });
        }
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(images);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
