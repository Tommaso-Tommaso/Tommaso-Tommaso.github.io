#!/usr/bin/env node
// convert-images.js
// Convert all jpg/jpeg images in images/ to webp using sharp
// Usage: node convert-images.js [--quality 80]

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', 'images');
const quality = Number(process.argv[2] && process.argv[2].includes('--quality=') ? process.argv[2].split('=')[1] : 80);

async function convertFile(file) {
  const input = path.join(imagesDir, file);
  const output = path.join(imagesDir, path.parse(file).name + '.webp');
  try {
    await sharp(input).webp({ quality }).toFile(output);
    console.log(`Converted: ${file} -> ${path.basename(output)} (${quality}%)`);
  } catch (err) {
    console.error(`Failed to convert ${file}:`, err.message);
  }
}

async function run() {
  if (!fs.existsSync(imagesDir)) {
    console.error('images/ directory not found.');
    process.exit(1);
  }
  const files = fs.readdirSync(imagesDir).filter(f => /\.(jpe?g)$/i.test(f));
  if (files.length === 0) {
    console.log('No JPG files found to convert.');
    return;
  }
  for (const file of files) {
    await convertFile(file);
  }
}

run();
