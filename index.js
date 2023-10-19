const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagePath = './assets/image.jpg'; // Replace with your image path
const destinationFolder = './final';   // Replace with your destination folder
const targetWidth = 367; // Replace with the desired width in pixels
const targetHeight = 363; // Replace with the desired height in pixels

let initialSize = 0;
let finalSize = 0;

fs.stat(imagePath, (err, stats) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const fileSizeInBytes = stats.size;
    const fileSizeInKilobytes = fileSizeInBytes / 1024;
    initialSize = fileSizeInKilobytes;
    // console.log(`File size: ${initialSize.toFixed(2)} KB`);
});

// Ensure the destination folder exists
if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
}

// Read the image
fs.readFile(imagePath, (err, data) => {
    if (err) {
        console.error('Error reading image:', err);
        return;
    }

    // Remove metadata, resize the image without maintaining aspect ratio, and save it to the destination folder
    sharp(data)
        .resize(targetWidth, targetHeight, { fit: 'fill' }) // Resize without maintaining aspect ratio
        .toFile(path.join(destinationFolder, 'image.jpg'), (err, info) => {
            if (err) {
                console.error('Error processing image:', err);
            } else {
                fs.stat(path.join(destinationFolder, 'image.jpg'), (err, stats) => {
                    if (err) {
                        console.error('Error reading file:', err);
                        return;
                    }

                    const fileSizeInBytes = stats.size;
                    const fileSizeInKilobytes = fileSizeInBytes / 1024;
                    finalSize = fileSizeInKilobytes;
                    // console.log(`File size: ${finalSize.toFixed(2)} KB`);
                    console.log(`File size decreased from ${initialSize.toFixed(2)} KB to ${finalSize.toFixed(2)} KB. This is a ${(100 - ((finalSize / initialSize) * 100)).toFixed(2)}% reduction which is reduced by ${(initialSize - finalSize).toFixed(2)} KB.`);
                });
            }
        });
});





