import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel, getHotelRooms } from '../controllers/hotels.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();


// CREATE
router.post('/', verifyAdmin, createHotel)

// UPDATE
router.put('/:id', verifyAdmin, updateHotel)

// DELETE
router.delete('/:id', verifyAdmin, deleteHotel)

// GET
router.get('/find/:id', getHotel)

// GET ALL
router.get('/', getHotels)

// Get count by city
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/rooms/:id', getHotelRooms)

export default router