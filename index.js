const express = require('express');
const { getMedia } = require('./scraper');

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});

const topAnime = "https://myanimelist.net/topanime.php";
const topManga = "https://myanimelist.net/topmanga.php";

// getMedia(topAnime, './Top100Anime.csv', './Top100Anime.json', 100);
// getMedia(topManga, './Top100Manga.csv', './Top100Manga.json', 100);
