import React, { useEffect, useState } from "react";
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
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);

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
          <IonTitle>{pokemonDetail ? capitalizeFirstLetter(pokemonDetail.name) : 'Loading...'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {pokemonDetail && (
          <IonCard>
            <IonCardContent>
              <IonList inset={true}>
              <IonItem>
              <IonImg src={pokemonDetail.images[0]} style={{ display: "block", margin: "0 auto" }} />
                </IonItem>
                <IonItem>
                  <IonLabel>ID: {pokemonDetail.id}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Type: {pokemonDetail.type.join(", ")}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Experience: {pokemonDetail.experience}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Abilities: {pokemonDetail.abilities.join(", ")}</IonLabel>
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

