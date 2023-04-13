const gameController = require('express').Router();
const { hasUser } = require('../middlewares/guards')
const { create,getAll } = require('../services/gameServices')

gameController.get("/create",  async (req, res) => {
    res.render('create')
})

gameController.post('/create', async (req, res) => {
    const game = {
        gamename: req.body.gamename,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        gerne: req.body.gerne,
        platform: req.body.platform,
        owner: req.user._id
    }

    try {
        await create(game)
        res.redirect('/')
    } catch (err) {
        console.log(err);
    }
})

gameController.get('/view', async(req,res)=>{
    const games = await getAll()
    res.render('catalog',{
        
        games
    })
})
module.exports = gameController