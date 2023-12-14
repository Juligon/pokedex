import React, { useState } from "react";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonSearchbar,
} from "@ionic/react";
import "./Home.css";
import PokemonsList from "../../components/PokemonsList/PokemonsList";

const Home: React.FC = () => {
	const [searchText, setSearchText] = useState("");

	const handleSearch = (e: CustomEvent) => {
		setSearchText(e.detail.value);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Pokedex</IonTitle>
				</IonToolbar>
				<IonToolbar>
					<IonSearchbar
						value={searchText}
						onIonChange={handleSearch}
						placeholder="Search by name or ID"
					></IonSearchbar>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Pokedex</IonTitle>
					</IonToolbar>
				</IonHeader>
				<PokemonsList search={searchText} />
			</IonContent>
		</IonPage>
	);
};

export default Home;
