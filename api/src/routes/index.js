const { Router } = require("express");
const router = Router();
const pokemonControllers = require("../controllers/pokemonControllers");

router.get('/pokemons', pokemonControllers.getPokemons)

module.exports = router;