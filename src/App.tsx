
import './App.css'

import {FormEvent} from "react";
import axios from "axios";

function App() {
    const APIKey = import.meta.env.VITE_APP_WEATHER_API_KEY;

    // Fonction qui va chercher les infos liées au formulaire
    const checkMeteo = async (ville: string) => {
        try {
            const response = axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${APIKey}&lang=fr&units=metric`
            );
            console.log(response)
        }
        catch (error) {
            console.log(error);
        }
    }

    // on récupère la ville dans l'input
    const handlerMeteo = (e : FormEvent) => {
        e.preventDefault();
        console.log('handler meteo')
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const ville: string | null = formData.get('ville') as string;
        console.log(ville.toLowerCase());

        checkMeteo(ville);

    }

  return (
    <>
        <section>
            <div className="flex ">
                <form onSubmit={handlerMeteo}>
                    <label>Nom de la Ville</label>
                    <input type="text"
                           name="ville"
                           className="ville"
                           id="ville"
                           required autoComplete="off"
                           placeholder="ex: Montpellier"/>
                    <div className="wrapper">
                        <input type="submit" value="Rechercher" />
                    </div>
                </form>
            </div>
        </section>
        <section className="meteo">
            <div className="afficher-meteo" id="afficher-meteo">
            </div>
        </section>
        <section>
            <div className="wind-eau">
                <div className="wind">
                    <div className="vent" id="vent"></div>
                </div>
                <div className="eau">
                    <div className="humidite" id="humidite"></div>
                </div>
            </div>
        </section>
    </>
  )
}

export default App
