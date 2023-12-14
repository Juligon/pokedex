import React, { useState } from "react";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonSearchbar,
	IonImg,
} from "@ionic/react";
import "./Home.css";
import PokemonsList from "../../components/PokemonsList/PokemonsList";
import Logo from "../../assets/logo.png";

const Home: React.FC = () => {
	const [searchText, setSearchText] = useState("");

	const handleSearch = (e: CustomEvent) => {
		setSearchText(e.detail.value);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonImg slot="start" src={Logo} style={{ height: "35px", paddingTop: "5px", paddingLeft: "10px"}} />
					<IonTitle style={{paddingTop: "5px"}}>Home</IonTitle>
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
				<PokemonsList search={searchText} />
			</IonContent>
		</IonPage>
	);
};

export default Home;
