import express from 'express';
import { getMedia } from './scraper';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

const topAnime = "https://myanimelist.net/topanime.php";
const topManga = "https://myanimelist.net/topmanga.php";

getMedia(topAnime, './Top100Anime.csv', 100);
getMedia(topManga, './Top100Manga.csv', 100);
