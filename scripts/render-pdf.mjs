// Render README.md -> public/cv.pdf using Puppeteer + Marked
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

const root = process.cwd();
const readmePath = path.join(root, 'README.md');
const outDir = path.join(root, 'public');
const outPdf = path.join(outDir, 'cv.pdf');

const md = fs.readFileSync(readmePath, 'utf-8');
const html = marked.parse(md);

const template = `<!doctype html>
<html><head>
<meta charset="utf-8" />
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
         line-height: 1.5; margin: 36px; font-size: 11pt; color: #111; }
  h1,h2,h3 { margin: 0.6em 0 0.4em; }
  h1 { font-size: 24pt; } h2 { font-size: 18pt; } h3 { font-size: 14pt; }
  code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
  ul { margin-left: 1.2em; }
  strong { font-weight: 600; }
  a { color: #0b5fff; text-decoration: none; }
</style>
</head><body>${html}</body></html>`;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setContent(template, { waitUntil: 'load' });
await page.pdf({ path: outPdf, format: 'A4', printBackground: true, margin: { top: '20mm', bottom: '20mm', left: '16mm', right: '16mm' } });
await browser.close();

console.log('Wrote', outPdf);
