const express = require('express');
const router = express.Router();
const musicController = require('../Controllers/MusicController');

router.get('/', musicController.getAll);

router.get('/playlist', musicController.getPlaylist);
router.get('/:id', musicController.getById);
router.post('/playlist', musicController.addToPlaylist);
router.delete('/playlist/:id', musicController.deleteById);
router.put('/:id', musicController.updateById);

module.exports = router;