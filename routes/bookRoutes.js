const express=require('express');

const {addBook,getAllBooks,getSingleBook,updateBook,deleteBook}=require('../controllers/bookController')
const {protect}=require('../middleware/authMiddleware')
const router=express.Router()

router.post('/',protect,addBook)
router.get('/',protect,getAllBooks)
router.get('/:id',protect,getSingleBook)
router.put('/:id',protect,updateBook)
router.delete('/:id',protect,deleteBook)

module.exports=router;
