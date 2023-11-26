import cheerio from 'cheerio'; // Parsing HTML
import axios from 'axios'; // Handles HTTP requests
import { Parser } from '@json2csv/plainjs'; // Parse data to CSV format
import { writeFileSync } from 'fs';

export const getMedia = async (url, fileName1, fileName2, max) => {
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
        const parser = new Parser();
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