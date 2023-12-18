require("dotenv").config();
const axios = require("axios");
const { API_URL } = process.env;

// Función para obtener lista básica de Pokémon con nombre e imagen, filtrar por nombre o id y paginado
const getPokemons = async (req, res, next) => {
  try {
    let { name, id, page = 1, limit = 20 } = req.query;
    let apiUrl;

    if (name || id) {
      apiUrl = `${API_URL}${name ? name.toLowerCase() : id}`;
    } else {
      apiUrl = API_URL;
    }

    const offset = (page - 1) * limit;
    const params = new URLSearchParams({
      offset: offset,
      limit: limit
    });

    const urlWithParams = `${apiUrl}?${params}`;

    const response = await axios.get(urlWithParams);

    if (response.data.results) {
      const pokemonResults = response.data.results;

      let pokemons = await Promise.all(
        pokemonResults.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            id: details.data.id,
            name: details.data.name,
            image: details.data.sprites.other['official-artwork'].front_default,
            types: details.data.types.map((type) => type.type.name),
          };
        })
      );

      if (name || id) {
        const lowerCaseSearchName = name ? name.toLowerCase() : name;
        pokemons = pokemons.filter(pokemon =>
          pokemon.name.toLowerCase().includes(lowerCaseSearchName)
        );
      }

      if (pokemons.length === 0) {
        return res.status(404).json({ message: "No Pokemons found" });
      }

      res.json(pokemons);
    } else {
      const pokemon = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.front_default,
        types: response.data.types.map((type) => type.type.name),
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
