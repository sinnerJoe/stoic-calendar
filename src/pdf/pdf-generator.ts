import {jsPDF} from 'jspdf'
import { differenceInWeeks, format } from "date-fns"

import './fonts/AmaticSC-Bold-bold';


export function generatePaper(birthDate: Date, expectancy: number) {
	const generator = new PDFGenerator(birthDate, expectancy);
	return generator.generate();
}

const PAPER_WIDTH = 595;
const PAPER_HEIGHT = 842;
const SPACE_BETWEEN_SQUARES = 3;
const SQUARES_PER_LINE = 52;
const PADDING = 30;
const BLOCK_SIZE = 5;
const BLOCK_SPACE = 5;
const MIDDLE_GAP = 30;
const TOP_MARGIN = 60;
const SQUARE_SIZE = (PAPER_WIDTH - PADDING * 2 - SPACE_BETWEEN_SQUARES * (SQUARES_PER_LINE -1) - MIDDLE_GAP) / SQUARES_PER_LINE;
const TITLE = "MEMENTO MORI";
class PDFGenerator {
	private doc = new jsPDF({
		compress: true,
		format: 'a4',
		unit: 'pt',
		precision: 72
	});
	private remainingYears: number;
	private expectancy: number;
	private weeksLived: number;
	private y: number;
	constructor(birthDate: Date, expectancy: number) {
		this.doc.setPage(0);
		this.doc.setProperties({
			title: `Stoic Calendar ${format(birthDate, 'yyyy-MM-dd')}`,
			author: 'https://stoic-calendar.com',
			creator: 'https://stoic-calendar.com'
		})
		this.remainingYears = expectancy;
		this.expectancy = expectancy;
		this.weeksLived = differenceInWeeks(new Date(), birthDate);
		this.y = TOP_MARGIN;
		this.doc.addMetadata('Your Life', 'title')
	}

	addFont(file, fileName, fontName, style) {

		this.doc.addFileToVFS(fileName, file);
		this.doc.addFont(fileName, fontName, style, undefined, 'StandardEncoding');

	}

	generate() {
		this.renderCalendar();
		return this.doc.output("arraybuffer")
	}

	renderTitle() {
		const xPos = PAPER_WIDTH / 2;
		const yPos = TOP_MARGIN;
		this.doc.setFontSize(28)
		this.doc.setFont("amatic");
		this.doc.text(TITLE, xPos, yPos, {align: 'center', maxWidth: PAPER_WIDTH });
		this.y += PADDING / 3 * 2;
	}

	renderCalendar() {
		this.renderTitle()
		while(this.remainingYears > 0) {
			this.renderBlock();
		}
	}

	renderYearMarker() {
		const x = PAPER_WIDTH - PADDING * 1.3;
		this.doc.setFontSize(8)
		this.doc.setFont(Object.keys(this.doc.getFontList())[0]);
		const text = String(this.expectancy - this.remainingYears) 
		const {h} = this.doc.getTextDimensions(text)
		this.doc.text(text, x, this.y - h/3, {align: 'left'});
	}

	renderBlock() {
		if(this.y > 750) {
			this.doc.addPage();
			this.y = TOP_MARGIN;
		}
		
		for(let i = 0; i < BLOCK_SIZE && this.remainingYears > 0; i++) {
			this.drawYear()
		}

		this.renderYearMarker();

		this.y += BLOCK_SPACE;
	}



	drawYear() {

		const calculateX = (column) => PADDING + column * SQUARE_SIZE + (column - 1) * SPACE_BETWEEN_SQUARES; 

		for(let i=0; i < SQUARES_PER_LINE / 2; i++) {
			this.drawWeek(calculateX(i), this.y);
		}
		const lastLeft = calculateX(SQUARES_PER_LINE / 2 - 1) - PADDING;
		for(let i=0; i < SQUARES_PER_LINE / 2; i++) {
			this.drawWeek(calculateX(i) + MIDDLE_GAP + lastLeft, this.y);
		}

		this.remainingYears--;
		this.y += SPACE_BETWEEN_SQUARES + SQUARE_SIZE
	}

	drawWeek(x: number, y: number) {
		const style = this.weeksLived > 0 ? "F" : undefined;
		this.weeksLived --;
		this.doc.rect(x, y, SQUARE_SIZE, SQUARE_SIZE, style);
	}
}
