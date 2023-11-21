const express = require('express');
const scraper = require('./scraper');

const app = express();
const PORT = 5000;

const topAnime = "https://myanimelist.net/topanime.php";
const topManga = "https://myanimelist.net/topmanga.php";

const scrapeAnime = scraper.getMedia(topAnime, './Top100Anime.csv', './Top100Anime.json', 100);
const scrapeManga = scraper.getMedia(topManga, './Top100Manga.csv', './Top100Manga.json', 100);

Promise.all([scrapeAnime, scrapeManga])
    .then(() => {
        console.log("Scraping completed");
        app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
    })
    .catch((error) => {
        console.error("Error during scraping:", error);
    });
