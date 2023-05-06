const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        
    } catch (err) {
        res.json({ error: true, message : err.message });
    }

})
