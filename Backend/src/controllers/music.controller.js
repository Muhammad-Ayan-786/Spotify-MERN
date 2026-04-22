const musicModel = require('../models/music.model');
const { uploadFile } = require('../services/storage.service');

const albumModel = require('../models/album.model');

// <---------- Create Music ---------->
async function createMusic(req, res) {

  // Create music
  const { title } = req.body
  const file = req.file

  // Upload file
  const result = await uploadFile(file.buffer.toString('base64'))

  // Create music
  const music = await musicModel.create({
    title,
    uri: result.url,
    artist: req.user.id
  })

  // Return music
  res.status(201).json({
    message: "Music created successfully",
    music: {
      _id: music._id,
      title: music.title,
      uri: music.uri,
      artist: music.artist
    }
  })
}

// <---------- Create Album ---------->
async function createAlbum(req, res) {

  // Get data
  const { title, musics } = req.body

  // Create album
  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics
  })

  // Return album
  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics
    }
  })

}

// <---------- Get All Musics ---------->
async function getAllMusics(req, res) {

  // Get musics
  const musics = await musicModel
    .find()
    .skip(0)
    // .limit(3) // Set limits OR TODO: Add pagination with skip and limit
    .populate('artist', "username email");

  // Return musics
  res.status(200).json({
    message: "Musics fetched successfully",
    musics: musics
  })
}

// <---------- Get All Albums ---------->
async function getAllAlbums(req, res) {

  // Get albums
  const albums = await albumModel.find().select("title artist").populate('artist', "username email");

  // Return albums
  res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums
  })
}

// <---------- Get Album By Id ---------->
async function getAlbumById(req, res) {

  // Get album
  const albumId = req.params.albumId

  // If album id is not provided
  if (!albumId) {
    return res.status(400).json({
      message: "Album id is required"
    })
  }

  // Get album
  const album = await albumModel.findById(albumId).populate('artist', "username email").populate('musics');

  // Return album
  res.status(200).json({
    message: "Album fetched successfully",
    album: album
  })
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };
