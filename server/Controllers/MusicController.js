const Music = require('../Models/MusicModel');



exports.getAll = (req, res) => {
    res.status(200).json(Music.getAll());
};

exports.getPlaylist = ( req, res, next ) => {
    
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(400).json({ error: 'Authorization header is missing' });
        }

        const playlist = Music.getPlaylist(JSON.parse(token));

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        res.status(200).json(playlist);
    } catch (error) {
        console.error('Error fetching playlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.addToPlaylist = (req, res, next) => {
    const token = req.headers.authorization;
        
        if (!token) {
            return res.status(400).json({ error: 'Authorization header is missing' });
        }
  
    res.status(200).json(Music.addToPlaylist(req.body.id,JSON.parse(token)));

}

exports.getById = (req, res, next) => {
    res.status(200).json(Music.getMusicById(parseInt(req.params.id)));
}

exports.save = (req, res, next) => {
    const newBook = new Book(null, req.body.title, req.body.ISBN, req.body.publishedDate, req.body.author).save();
    res.status(201).json(newBook);
}

exports.deleteById = (req, res, next) => {
    const token = req.headers.authorization;
        
        if (!token) {
            return res.status(400).json({ error: 'Authorization header is missing' });
        }
        
    res.status(200).json(Music.deleteFromPlaylist(parseInt(req.params.id), JSON.parse(token)));
}

exports.updateById = (req, res, next) => {
    new Music(null, req.body.title, req.body.ISBN, req.body.publishedDate, req.body.author)
        .update(parseInt(req.params.id));
    res.status(204).end();
}