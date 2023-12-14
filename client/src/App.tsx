import { Redirect, Route } from "react-router-dom";
import {
	IonApp,
	IonIcon,
	IonImg,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import Logo from "./assets/logo2.svg";

setupIonicReact();

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet placeholder={undefined}>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/pokemons/:id">
						<Detail />
					</Route>
					<Redirect to="/" />
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton tab="allPokemons" href="/">
						{/* <IonIcon aria-hidden="true" icon={square} size="small" /> */}
						<IonImg aria-hidden="true" src={Logo} style={{height: "35px", color: "#fff"}}/>
						<IonLabel style={{color: "#fff"}}>Pokedex</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
