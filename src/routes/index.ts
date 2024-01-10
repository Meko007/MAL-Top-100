import express from 'express';
import { getMedia } from '../scraper';

const router = express.Router();

router.get('/scrape', async (req: express.Request, res: express.Response) => {
	try {
		const url = req.query.url as string;
		const fileName = req.query.fileName as string;
		const max = parseInt(req.query.max as string, 10) || 10;

		if (!url || !fileName) {
			res.send('URL and fileName parameters are required');
		}

		await getMedia(url, fileName, max);
		res.status(200).json({ message: 'Scraped and saved to downloads' });
	} catch (error) {
		res.status(500).send('Error scraping data');
	}
});

export default router;