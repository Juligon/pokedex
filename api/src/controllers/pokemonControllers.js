require("dotenv").config();
const axios = require("axios");

const getPokemons = async (req, res, next) => {
	try {
		const { page, name, id } = req.query;
    const pageSize = 20;

    const offset = page ? (page - 1) * pageSize : 0;

    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`);
    const pokemonResults = apiUrl.data.results;

		let pokemons = await Promise.all(
			pokemonResults.map(async (pokemon) => {
				const pokemonDetails = await axios.get(pokemon.url);
				return {
					id: pokemonDetails.data.id,
					name: pokemonDetails.data.name,
					image: pokemonDetails.data.sprites.front_default,
					experience: pokemonDetails.data.base_experience,
					abilities: pokemonDetails.data.abilities.map(
						(ability) => ability.ability.name
					),
					height: pokemonDetails.data.height,
					weight: pokemonDetails.data.weight,
				};
			})
		);

		if (name) {
			pokemons = pokemons.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(name.toLowerCase())
			);
		}
		if (id) {
			pokemons = pokemons.filter((pokemon) => pokemon.id.toString() === id);
		}
		if (pokemons.length === 0) {
			{
				const error = new Error("Pokemons not found");
				error.status = 404;
				throw error;
			}
		}

		res.json(pokemons);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getPokemons,
};
