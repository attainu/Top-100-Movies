const { Router } = require("express");
const { allMovie,addMovieData } = require('../controller/Api_controller')
const {tokenAuth} = require('../middleware/auth')
const model = require('../model/movieGener')

const router = Router();

//all movies
router.post('/movies',allMovie)

router.post('/movies/add_movie',tokenAuth,addMovieData);

module.exports = router;