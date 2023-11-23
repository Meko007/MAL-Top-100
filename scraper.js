const cheerio = require('cheerio'); // Parsing HTML
const axios = require('axios'); // Handles HTTP requests
const j2c = require('json2csv').Parser; // Parse data to CSV format
const { writeFileSync } = require('fs');

/**
 * Scrapes top anime from MyAnimeList and saves the data in CSV and JSON formats.
 * @param {string} url - The URL of the MyAnimeList page to scrape.
 * @param {string} fileName1 - The name of the CSV file to save the data.
 * @param {string} fileName2 - The name of the JSON file to save the data.
 * @param {number} max - The maximum number of anime to scrape.
 */
const getMedia = async (url, fileName1, fileName2, max) => {
    try {
        let scrapedItems = 0;
        const data = [];

        // Scrape data from each page
        while (scrapedItems < max) {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            $(".ranking-list").each(function () {
                const rank = parseInt($(this).find(".rank .top-anime-rank-text").text());
                const title = $(this).find("h3 a").text();
                const score = $(this).find(".score .text").text();

                data.push({ rank, title, score });
                scrapedItems++;
            });

            const nextPage = $(".pagination a.next").attr("href");
            if (!nextPage) break;

            url = new URL(nextPage, url).href;
        }

        // Convert data to CSV format
        const parser = new j2c();
        const csv = parser.parse(data.slice(0, max));
        writeFileSync(fileName1, csv, (err) => {
            if (err) throw err;
        });

        // Convert data to JSON format
        writeFileSync(fileName2, JSON.stringify(data.slice(0, max), null, 2), (err) => {
            if (err) throw err;
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = { getMedia };
