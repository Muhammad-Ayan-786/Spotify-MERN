const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadFile(file) {
  const result = await client.files.upload({
    file,
    fileName: 'music' + Date.now(),
    folder: '07-Spotify/music',
  })

  return result
}

module.exports = { uploadFile };