const { Router } = require("express");
const router = Router();
const pokemonControllers = require("../controllers/pokemonControllers");

router.get("/pokemons", pokemonControllers.getPokemons);

router.get("/pokemons/:id", pokemonControllers.getPokemonDetails);

module.exports = router;
