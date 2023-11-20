const cheerio = require('cheerio'); //Parsing HTML
const axios = require('axios');
const j2c = require('json2csv').Parser; //Parse data to CSV format
const fs = require('fs');

const topAnime = "https://myanimelist.net/topanime.php";
const topManga = "https://myanimelist.net/topmanga.php";
// const baseUrl = "https://myanimelist.net/topanime.php";
const data = [];

const getMedia = async (url) => {
    try{
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        // let scrapedItems = 0;

        $(".ranking-list").each((i, media) => {
            rank = $(media).find(".rank .rank1").text();
            title = $(media).find("h3 a").text();
            score = $(media).find(".score .text").text();

            data.push({rank, title, score});
            // scrapedItems++;

            // if(scrapedItems >= 100){
            //     return false;
            // }
        });

        // if($(".next").length > 0 && scrapedItems < 100){
        //     nextPage = topAnime + $(".next").attr("href");
        //     await getAnime(nextPage);
        // }else{
        //     const parser = new j2c();
        //     const csv = parser.parse(data);
        //     fs.writeFileSync("./Top 100 anime.csv", csv);
        // }

        const parser = new j2c();
        const csv = parser.parse(data);
        fs.writeFileSync("./Top 100.csv", csv, (err) => {
            if(err) throw err;
        });
        fs.writeFileSync('Top100.json', JSON.stringify(data), (err) => {
            if(err) throw err;
        });
    }catch(err){
        console.log(err);
    }
};

getMedia(topAnime);
getMedia(topManga);