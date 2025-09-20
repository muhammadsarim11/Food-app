import dotenv from "dotenv";
dotenv.config();

import ImageKit from "imagekit";

console.log("PUBLIC_KEY:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("PRIVATE_KEY:", process.env.IMAGEKIT_PRIVATE_KEY);
console.log("ENDPOINT:", process.env.IMAGEKIT_ENDPOINT);

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_ENDPOINT
});



export const UploadVideo = async (file, fileName) => {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file,
            fileName: fileName
        }, function(error, result) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
}

