import express from 'express';
import route from './routes/index';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT ?? 3000;

app.use('/', route);

// https://myanimelist.net/topanime.php;
// https://myanimelist.net/topmanga.php;

app.listen(port, () => {
	console.log(`server is listening on port ${port}`);
});