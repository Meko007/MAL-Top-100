const express = require('express');
const cheerio = require('cheerio'); // Parsing HTML
const axios = require('axios'); // Handles HTTP requests
const j2c = require('json2csv').Parser; // Parse data to CSV format
const { writeFileSync } = require('fs');

const app = express();
const PORT = 5000;

// URLs for top anime and manga lists
const topAnime = "https://myanimelist.net/topanime.php";
const topManga = "https://myanimelist.net/topmanga.php";

// Function to scrape media data from the provided URL
const getMedia = async (url, fileName1, fileName2, max) => {
    try {
        let scrapedItems = 0;
        const data = [];

        // Loop through pages until the maximum number of items is reached
        while (scrapedItems < max) {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            // Extract media data from each page
            $(".ranking-list").each(function() {
                const rank = $(this).find(".rank .top-anime-rank-text").text();
                const title = $(this).find("h3 a").text();
                const score = $(this).find(".score .text").text();

                data.push({ rank, title, score });
                scrapedItems++;
            });

            // Move to the next page
            const nextPage = $(".pagination a.next").attr("href");
            if (!nextPage) break;

            // url = url + nextPage;
            // url = nextPage.startsWith("http") ? nextPage : url + nextPage;
            url = new URL(nextPage, url).href;
        }

        // Convert data to CSV format and save it to a file
        const parser = new j2c();
        const csv = parser.parse(data.slice(0, max));
        writeFileSync(fileName1, csv, (err) => {
            if (err) throw err;
        });

        // Convert data to JSON format and save it to a file
        writeFileSync(fileName2, JSON.stringify(data.slice(0, max), null, 2), (err) => {
            if(err) throw err;
        });
    } catch (err) {
        console.log(err);
    } finally {
        server.close(() => { console.log('server closed'); });
        // console.log("Scraping completed");
    }
};

// Scrape top 100 anime and manga data and save it to CSV and JSON files
getMedia(topAnime, './Top100Anime.csv', './Top100Anime.json', 100);
getMedia(topManga, './Top100Manga.csv', './Top100Manga.json', 100);

const server = app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));

/*
This code uses the `cheerio` library to parse HTML and the `axios` library to make HTTP requests. 
It defines a function, `getMedia`, which scrapes media data from the provided URLs and saves it to CSV and JSON files. 
The `getMedia` function handles pagination and stops once the maximum number of items is reached.
*/