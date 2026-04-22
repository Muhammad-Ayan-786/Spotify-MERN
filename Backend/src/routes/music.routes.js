const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage()
})

const router = express.Router();

/* <---------------- Create music ----------------> */

// Upload music
router.post('/upload', authMiddleware.authArtist, upload.single('music'), musicController.createMusic);

// Create album
router.post('/album', authMiddleware.authArtist, musicController.createAlbum);


/* <------------ Get musics and albums -----------> */

// Get all musics
router.get('/', authMiddleware.authUser, musicController.getAllMusics);

// Get all albums
router.get('/albums', authMiddleware.authUser, musicController.getAllAlbums);

// Get album by id
router.get('/albums/:albumId', authMiddleware.authUser, musicController.getAlbumById);



module.exports = router;