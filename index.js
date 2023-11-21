// Importing required modules
const cheerio = require('cheerio'); // Parsing HTML
const axios = require('axios');
const j2c = require('json2csv').Parser; // Parse data to CSV format
const { writeFileSync } = require('fs');

// URLs for top anime and manga lists
const topAnime = "https://myanimelist.net/topanime.php";
const topManga = "https://myanimelist.net/topmanga.php";

// Function to scrape media data from the provided URL
const getMedia = async (url, fileName1, fileName2, max = 100) => {
    try {
        let scrapedItems = 0;
        const data = [];

        // Loop through pages until the maximum number of items is reached
        while (scrapedItems < max) {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            // Extract media data from each page
            $(".ranking-list").each((i, media) => {
                const rank = $(media).find(".rank .top-anime-rank-text").text();
                const title = $(media).find("h3 a").text();
                const score = $(media).find(".score .text").text();

                data.push({ rank, title, score });
                scrapedItems++;
            });

            // Move to the next page
            const nextPage = $(".next").attr("href");
            if (!nextPage) break;
            url = url + nextPage;
        }

        // Convert data to CSV format and save it to a file
        const parser = new j2c();
        const csv = parser.parse(data.slice(0, max));
        writeFileSync(fileName1, csv, (err) => {
            if (err) throw err;
        });

        // Convert data to JSON format and save it to a file
        writeFileSync(fileName2, JSON.stringify(data.slice(0, max)), (err) => {
            if (err) throw err;
        });
    } catch (err) {
        console.log(err);
    }
};

// Scrape top 100 anime and manga data and save it to CSV and JSON files
getMedia(topAnime, './Top100Anime.csv', './Top100Anime.json');
getMedia(topManga, './Top100Manga.csv', './Top100Manga.json');
//
/*
This code uses the `cheerio` library to parse HTML and the `axios` library to make HTTP requests. 
It defines a function, `getMedia`, which scrapes media data from the provided URLs and saves it to CSV and JSON files. 
The `getMedia` function handles pagination and stops once the maximum number of items is reached.
*/