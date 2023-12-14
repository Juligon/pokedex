import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import "./Home.css";
import PokemonsList from "../../components/PokemonsList/PokemonsList";

const Home: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Pokedex</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Pokedex</IonTitle>
					</IonToolbar>
				</IonHeader>
				<PokemonsList />
			</IonContent>
		</IonPage>
	);
};

export default Home;
