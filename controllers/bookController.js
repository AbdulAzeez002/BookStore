
const Book = require('../models/bookModel')
const User = require('../models/userModel')

//@description: Adding book
// @route : POST /api/book
// @access : private
const addBook = async (req, res) => {
    try {
        const book = await Book.create({
            name: req.body.name,
            author: req.body.author,
            summary: req.body.summary,
            created_by: req.user._id

        })
        res.status(200).json(book)

    } catch (error) {
        res.json({ "error": error })
    }

}

//@description: getting All books
// @route : GET /api/book
// @access : private
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(201).json(books)

    } catch (error) {
        res.json({ "error": "something went wrong. Try again" })
    }
}


//@description: update books
// @route : PUT /api/book/:id
// @access : private

const updateBook = async (req, res) => {

    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            res.status(400).json({ 'error': 'no book found' })
            return
        }

        const user = await User.findById(req.user._id)

        //check for user

        if (!user) {
            res.status(401).json({ "error": "unauthorized" })
            return
        }

        // make sure loggedIn user mathes the book user

        if (book.created_by.toString() !==  user._id.toString()) {
            res.status(401).json({ "error": "unauthorized" })
            return
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedBook)
    } catch (error) {

        res.json({ 'error': "something went wrong. try again later" })
    }

}


//@description: delete book
// @route : DELETE /api/book/:id
// @access : private

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            res.status(400).json({ 'error': 'no book found' })
            return
        }

        const user = await User.findById(req.user._id)

        //check for user

        if (!user) {
            res.status(401).json({ "error": "unauthorized" })
            return
        }

        // make sure loggedIn user mathes the book user
 
        if (book.created_by.toString()  !== user._id.toString()) {
            res.status(401).json({ "error": "unauthorized" })
            return
        }

        const deletedBook= await Book.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedBook)
    } catch (error) {
        res.json({ "error": "some thing went wrong" })
    }

}

const getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (book) {
            res.status(200).json(book)
        }else{
            res.json({ 'error': 'no book found' })
        }

    } catch (error) {
        res.json({ "error": "some thing went wrong" })
    }
}

module.exports = {
    addBook, getAllBooks, updateBook, deleteBook, getSingleBook
}