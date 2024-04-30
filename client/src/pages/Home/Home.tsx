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
import { useHistory } from "react-router-dom";
import "./Home.css";
import PokemonsList from "../../components/PokemonsList/PokemonsList";
import Logo from "../../assets/logo.png";

const Home: React.FC = () => {
	const [searchText, setSearchText] = useState("");
	const history = useHistory();

	const handleSearch = (e: CustomEvent) => {
		setSearchText(e.detail.value);
	};

	const navigateToHomePage = () => {
		history.push("/");
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonImg
						slot="start"
						src={Logo}
						style={{
							height: "35px",
							paddingTop: "5px",
							paddingLeft: "10px",
							cursor: "pointer",
						}}
						onClick={navigateToHomePage}
					/>
					<IonTitle
						onClick={navigateToHomePage}
						style={{ paddingTop: "5px", cursor: "pointer" }}
					>
						Home
					</IonTitle>
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
