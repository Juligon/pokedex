import React, { useState, useEffect } from "react";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonSearchbar,
	IonImg,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import "./Home.css";
import PokemonList from "../../components/PokemonsList/PokemonsList";
import Logo from "../../assets/logo.png";

const Home: React.FC = () => {
	const [searchText, setSearchText] = useState("");
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchParam = urlParams.get("search") || "";
		setSearchText(searchParam);
	}, [location]);

	const handleSearch = (e: CustomEvent) => {
		const value = e.detail.value;
		setSearchText(value);
		history.push(`/?search=${value}`);
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
				<PokemonList search={searchText} />
			</IonContent>
		</IonPage>
	);
};

export default Home;


