import React, { useEffect, useState } from "react";
import {
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
	IonButton,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonRouterLink,
	IonCardContent,
	IonChip,
	IonLabel,
} from "@ionic/react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import "./PokemonsList.css";

interface Pokemon {
	id: number;
	name: string;
	image: string;
	types: string;
}

interface PokemonListProps {
	search: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ search }) => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [disableInfiniteScroll, setDisableInfiniteScroll] = useState(false);

	const fetchPokemons = async (page: number, search: string = "") => {
		try {
			const apiUrl = `${SERVER_URL}?page=${page}&name=${search}`;
			const response = await fetch(apiUrl);

			if (!response.ok) {
				throw new Error("Failed to fetch Pokemon list");
			}

			const data = await response.json();

			if (page === 1 || page === currentPage + 1) {
				setPokemons((prevPokemons) => {
					if (page === 1) {
						return data;
					} else {
						return [...prevPokemons, ...data];
					}
				});

				if (page === 1) {
					window.history.pushState({ page }, `Page ${page}`, `?page=${page}`);
				}
			}
		} catch (error) {
			console.error("Error fetching Pokemon list:", error);
		}
	};

	const loadMoreData = (event: CustomEvent<void>) => {
		setTimeout(() => {
			const nextPage = currentPage + 1;
			fetchPokemons(nextPage, search);
			setCurrentPage(nextPage);
			//@ts-ignore
			event.target.complete();

			if (pokemons.length >= 200) {
				setDisableInfiniteScroll(true);
			}
		}, 500);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const initialPage = parseInt(urlParams.get("page") || "1", 10);
		setCurrentPage(initialPage);

		fetchPokemons(initialPage, search);
	}, [search]);

	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const mapTypeToColor = (type: string | number) => {
		// Mapeo de tipos a colores
		const typeColorMap = {
			grass: "#78C850",
			fire: "#F08030",
			water: "#6890F0",
			normal: "#AAA67F",
			fighting: "#C12239",
			flying: "#A891EC",
			ground: "#DEC16B",
			poison: "#A43E9E",
			rock: "#B69E31",
			bug: "#A7B723",
			ghost: "#70559B",
			steel: "#B7B9D0",
			electric: "#F9CF30",
			psychic: "#FB5584",
			ice: "#9AD6DF",
			dragon: "#7037FF",
			dark: "#75574C",
			fairy: "#E69EAC",
			shadow: "#453F3A",
		};
		//@ts-ignore
		return typeColorMap[type] || "#A8A878";
	};

	return (
		<IonContent>
			<IonGrid>
				<IonRow>
					{pokemons.map((pokemon) => (
						<IonCol size="6" size-md="4" size-lg="3" key={pokemon.id}>
							<IonRouterLink routerLink={`/pokemons/${pokemon.id}`}>
								<IonCard>
									<img
										src={pokemon.image}
										alt={pokemon.name}
										style={{
											display: "block",
											height: "180px",
											margin: "0 auto",
											padding: "10px",
										}}
									/>
									<IonCardHeader>
										<IonCardSubtitle>ID: {pokemon.id}</IonCardSubtitle>
										<IonCardTitle>
											{capitalizeFirstLetter(pokemon.name)}
										</IonCardTitle>
									</IonCardHeader>
									<IonCardContent>
										{/* @ts-ignore */}
										{pokemon.types.map((type, index) => (
											<IonChip
												key={index}
												style={{ backgroundColor: mapTypeToColor(type) }}
											>
												<IonLabel style={{ color: "white", fontSize: "11px" }}>{type}</IonLabel>
											</IonChip>
										))}
									</IonCardContent>
								</IonCard>
							</IonRouterLink>
						</IonCol>
					))}
				</IonRow>
				<IonInfiniteScroll
					threshold="100px"
					disabled={disableInfiniteScroll}
					onIonInfinite={(e: CustomEvent<void>) => loadMoreData(e)}
				>
					<IonInfiniteScrollContent loadingText="Loading more items..."></IonInfiniteScrollContent>
				</IonInfiniteScroll>
			</IonGrid>
		</IonContent>
	);
};

export default PokemonList;
