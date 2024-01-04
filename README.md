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
```

## Usage

To run the scraper, simply run the following command:

```
npm run dev
```

The scraper will start running and will save the data to the following CSV files:

- `Top100Anime.csv`
- `Top100Manga.csv`