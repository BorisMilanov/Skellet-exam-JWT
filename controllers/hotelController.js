const { create, getById, update,deleteById, bookRoom } = require('../services/hotelService')
const hotelController = require('express').Router();

hotelController.get('/:id/details', async (req, res) => {
    const hotel = await getById(req.params.id);
    if (hotel.owner == req.user._id) {
        hotel.isOwner = true
    }else if(hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())){
        hotel.isBooked = true;
    }
    res.render('details', {
        hotel
    });
})

hotelController.get('/create', (req, res) => {
    res.render('create')
})

hotelController.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        rooms: Number(req.body.rooms),
        imageUrl: req.body.imageUrl,
        owner: req.user._id
        //Todo warning switch room and img
    }

    try {
        await create(hotel);
        res.redirect('/')
    } catch (err) {

    }
})

hotelController.get('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login')
    }

    res.render('edit', { hotel });
})
hotelController.post('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login')
    }
    const edited = {
        name: req.body.name,
        city: req.body.city,
        rooms: Number(req.body.rooms),
        imageUrl: req.body.imageUrl,
    }
    try{
        await update(req.params.id, edited)
        res.redirect(`/hotel/${req.params.id}/details`)
    }catch(err){
        console.log(err)
        res.render('create')
    }
    

})

hotelController.get('/:id/delete', async (req,res)=>{
    const hotel = await getById(req.params.id);
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login')

      
    }
    await deleteById(req.params.id)
    res.redirect('/')
})

hotelController.get('/:id/book', async (req,res)=>{
    const hotel = await getById(req.params.id);
 
    try {

        if (hotel.owner == req.user._id) {
            hotel.isOwner = true;
            throw new Error('Cannot book hotel room.')
        }
        await bookRoom(req.params.id, req.user._id)
        res.redirect(`/hotel/${req.params.id}/details`)
    
        
    } catch (error) {
        res.render('details',{
            hotel
        })
    }
})

module.exports = hotelController;