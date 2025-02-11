import fs from 'fs';
import PDFDocument from 'pdfkit';
import { Note } from '../../types.js';

export function exportNoteToPDF(note:Note, imagePath: string, outputPath: string) {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    doc.fontSize(24).font('Helvetica-Bold').text(note.title, { align: 'center' });
    doc.moveDown();

    if (imagePath) {
        doc.image(imagePath, { width: 400, align: 'center' });
        doc.moveDown();
    }

    doc.fontSize(14).font('Helvetica').text(note.body, { align: 'left' });

    doc.end();
}
