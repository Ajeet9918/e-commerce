const express = require("express")
const router = express.Router()
const cors = require("cors")
const uploadPhoto = require("../middlewares/upload")
const auth = require("../middlewares/auth") 
const { getItem, searchItems, addItem, updateItem, deleteItem } = require("../controllers/itemsController")

router.get('/search', cors(), searchItems)
router.get('/', cors(), getItem)

router.post('/', uploadPhoto.array('images'), addItem)
router.post('/', auth, uploadPhoto.array('images'), addItem) 
router.put('/:id', auth, updateItem)
router.delete('/:id', auth, deleteItem)

module.exports = router