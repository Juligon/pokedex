import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import "./PokemonDetail.css";

const PokemonDetail: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Pokemon</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Pokemon</IonTitle>
					</IonToolbar>
				</IonHeader>
			</IonContent>
		</IonPage>
	);
};

export default PokemonDetail;
