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

        
        const playlist = Music.getPlaylist(token);

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        res.status(200).json(playlist);
    } catch (error) {
       
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.addToPlaylist = (req, res, next) => {
    const token = req.headers.authorization;
        
        if (!token) {
            return res.status(400).json({ error: 'Authorization header is missing' });
        }
      
    res.status(200).json(Music.addToPlaylist(req.body.id,token));

}

exports.getById = (req, res, next) => {
    res.status(200).json(Music.getMusicById(parseInt(req.params.id)));
}


exports.deleteById = (req, res, next) => {
    const token = req.headers.authorization;
        
        if (!token) {
            return res.status(400).json({ error: 'Authorization header is missing' });
        }
     
    res.status(200).json(Music.deleteFromPlaylist(req.params.id, token));
}

