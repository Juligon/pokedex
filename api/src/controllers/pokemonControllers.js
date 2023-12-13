require("dotenv").config();
const axios = require("axios");
const { API_URL } = process.env;

// Función para obtener lista básica de Pokémon con nombre e imagen, filtrar por nombre o id y paginado
const getPokemons = async (req, res, next) => {
	try {
		let { name, id, page = 1, limit = 20 } = req.query;
		console.log('Current Page:', page);

		let apiUrl = API_URL;

		if (name || id) {
			apiUrl = `https://pokeapi.co/api/v2/pokemon/${name || id}`;
		}

		const response = await axios.get(apiUrl);

		if (response.data.results) {
			const pokemonResults = response.data.results;

			// Obtiene la siguiente página
			let nextPageUrl = response.data.next;
			let currentPage = 1;

			while (nextPageUrl && currentPage < page) {
				const nextPageResponse = await axios.get(nextPageUrl);
				pokemonResults.push(...nextPageResponse.data.results);
				nextPageUrl = nextPageResponse.data.next;
				currentPage++;
			}

			// Paginación
			const start = (page - 1) * limit;
			const end = start + limit;
			const paginatedResults = pokemonResults.slice(start, end);

			let pokemons = await Promise.all(
				paginatedResults.map(async (pokemon) => {
					const details = await axios.get(pokemon.url);
					return {
						id: details.data.id,
						name: details.data.name,
						image: details.data.sprites.front_default,
					};
				})
			);

			if (pokemons.length === 0) {
				return res.status(404).json({ message: "No Pokemons found" });
			}

			res.json(pokemons);
		} else {
			const pokemon = {
				id: response.data.id,
				name: response.data.name,
				image: response.data.sprites.front_default,
			};
			res.json([pokemon]);
		}
	} catch (error) {
		next(error);
	}
};

// Función para obtener los detalles completos de un Pokémon específico
const getPokemonDetails = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id || isNaN(id)) {
			const error = new Error("Invalid Pokemon ID");
			error.status = 400;
			throw error;
		}

		const apiUrl = await axios.get(`${API_URL}${id}`);
		const pokemonDetails = {
			id: apiUrl.data.id,
			name: apiUrl.data.name,
			images: [
				apiUrl.data.sprites.front_default,
				apiUrl.data.sprites.front_shiny,
				apiUrl.data.sprites.back_default,
				apiUrl.data.sprites.back_shiny,
			],
			type: apiUrl.data.types.map((type) => type.type.name),
			experience: apiUrl.data.base_experience,
			abilities: apiUrl.data.abilities.map((ability) => ability.ability.name),
			height: apiUrl.data.height,
			weight: apiUrl.data.weight,
		};

		res.json(pokemonDetails);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getPokemons,
	getPokemonDetails,
};
