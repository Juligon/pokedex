import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonImg,
	IonLabel,
	IonItem,
	IonList,
	IonButtons,
	IonBackButton,
	IonCard,
	IonCardContent,
} from "@ionic/react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./Detail.css";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface DetailProps extends RouteComponentProps<{ id: string }> {}

interface PokemonDetail {
	id: number;
	name: string;
	images: string[];
	type: string[];
	experience: number;
	abilities: string[];
	height: number;
	weight: number;
}

const Detail: React.FC<DetailProps> = ({ match, history }) => {
	const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(
		null
	);

	useEffect(() => {
		const fetchPokemonDetail = async () => {
			try {
				const response = await fetch(`${SERVER_URL}${match.params.id}`);
				if (!response.ok) {
					throw new Error("Failed to fetch Pokemon details");
				}

				const data: PokemonDetail = await response.json();
				setPokemonDetail(data);
			} catch (error) {
				console.error("Error fetching Pokemon details:", error);
			}
		};

		fetchPokemonDetail();
	}, [match.params.id]);

	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>
						{pokemonDetail
							? capitalizeFirstLetter(pokemonDetail.name)
							: "Loading..."}
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				{pokemonDetail && (
					<IonCard>
						<IonCardContent>
            <Carousel>
                {pokemonDetail.images.map((image, index) => (
                  <IonItem key={index}>
                    <IonImg
                      src={image}
                      style={{ display: "block", margin: "0 auto", paddingBottom: "25px"}}
                    />
                  </IonItem>
                ))}
              </Carousel>
							<IonList inset={true}>
								<IonItem>
									<IonLabel>ID: {pokemonDetail.id}</IonLabel>
								</IonItem>
								<IonItem>
									<IonLabel>Type: {capitalizeFirstLetter(pokemonDetail.type.join(", "))}</IonLabel>
								</IonItem>
								<IonItem>
									<IonLabel>Experience: {pokemonDetail.experience}</IonLabel>
								</IonItem>
								<IonItem>
									<IonLabel>
										Abilities: {capitalizeFirstLetter(pokemonDetail.abilities.join(", "))}
									</IonLabel>
								</IonItem>
								<IonItem>
									<IonLabel>Height: {pokemonDetail.height}</IonLabel>
								</IonItem>
								<IonItem>
									<IonLabel>Weight: {pokemonDetail.weight}</IonLabel>
								</IonItem>
							</IonList>
						</IonCardContent>
					</IonCard>
				)}
			</IonContent>
		</IonPage>
	);
};

export default withRouter(Detail);
