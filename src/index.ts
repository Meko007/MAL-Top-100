import express from 'express';
import { getMedia } from './scraper';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT ?? 3000;


const topAnime = "https://myanimelist.net/topanime.php";
const topManga = "https://myanimelist.net/topmanga.php";

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
    getMedia(topAnime, './Top100Anime.csv', 100);
    getMedia(topManga, './Top100Manga.csv', 100);
});