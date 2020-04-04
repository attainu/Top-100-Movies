const express = require("express");
const { allMovie,addMovieData,reviewSystem } = require('../controller/Api_controller')
const {tokenAuth} = require('../middleware/auth')
const model = require('../model/movieGener')
const app = express()

app.use(tokenAuth)
const router = express.Router();

//all movies
router.post('/movies',allMovie)

router.post('/movies/add_movie',tokenAuth,addMovieData);

router.post('/movies/review',tokenAuth,reviewSystem)

module.exports = router;