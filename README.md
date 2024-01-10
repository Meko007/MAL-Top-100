# MAL Top animanga

This project scrapes the top n anime and manga from MyAnimeList.net and saves the data to CSV files.

## Prerequisites

- Node.js and npm
- A MyAnimeList.net account (optional)

## Installation

1. Clone the repository:

```
git clone https://github.com/Meko007/MAL-Top-Animanga.git
```

2. Install the dependencies:

```
npm install
```

## Configuration

Create a `.env` file in the project root directory and add the following environment variables:

```
PORT=XXXX
USER_PROFILE=<your PC's user path e.g C:\Users\Nodemon>
```

## Usage

To run the scraper, simply run the following command:

```
npm run dev
```
Head over the browser and type this into the URL bar and type in:

```
http://localhost:XXXX/scrape?url=https://myanimelist.net/topmanga.php&fileName=<file name of your choice>.csv&max=<amount of titles you want to scrape e.g 100>
```
OR

```
http://localhost:XXX/scrape?url=https://myanimelist.net/topanime.php&fileName=<file name of your choice>.csv&max=<amount of titles you want to scrape e.g 100>
```

The scraper will start running and will save the data to a CSV file in your downloads folder.
