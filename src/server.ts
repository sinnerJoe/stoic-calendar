import sirv from 'sirv';
import polka from 'polka';
import buffer from 'buffer'
import compression from 'compression';
import * as sapper from '@sapper/server';
import { generatePaper } from './pdf/pdf-generator';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = polka(); // You can also use Express
server.get('/pdf/:birth/:expectancy/stoic-calendar', (req, res) => {
	const {birth, expectancy} = req.params;
	const pdfBlob = generatePaper(new Date(birth), Number(expectancy));
	// res.setHeader("Content-Disposition", `attachment; filename="stoic-calendar-${birth}.pdf"`);
	res.write(Buffer.from(pdfBlob));
	res.end();
});
server.use(
	compression({ threshold: 0 }) as any,
	sirv('static', { dev }),
	sapper.middleware()
)

server.listen(PORT, () => {
	// if (err) console.log('error', err);
})