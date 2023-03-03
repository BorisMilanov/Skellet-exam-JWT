const {create, getById} = require('../services/hotelService')
const hotelController = require('express').Router();

hotelController.get('/:id/details',async (req,res)=>{
    const hotel = await getById(req.params.id);
    res.render('details',{
        hotel
    });
})

hotelController.get('/create',(req,res)=>{
    res.render('create')
})

hotelController.post('/create',async(req,res)=>{
    const hotel = {
       name:req.body.name,
       city:req.body.city,
       rooms:req.body.rooms,
       imageUrl: req.body.imageUrl, 
       owner:req.user._id
       //Todo warning switch room and img
   
    }

    try{
        await create(hotel);
        res.redirect('/')
    }catch(err){

    }
})

hotelController.get('/:id/edit',(req,res)=>{
    res.render('edit');
})

module.exports = hotelController;