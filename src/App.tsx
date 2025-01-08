
import './App.css'

import {FormEvent, useState} from "react";
import axios from "axios";
import {MeteoDataProps} from "./interface.ts";
import {FaWind} from "react-icons/fa";
import {IoWater} from "react-icons/io5";

function App() {
    const APIKey = import.meta.env.VITE_APP_WEATHER_API_KEY;

    const [meteoData, setMeteoData] = useState<MeteoDataProps | null>(null);


    // Fonction qui va chercher les infos liées au formulaire
    const checkMeteo = async (ville: string) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${APIKey}&lang=fr&units=metric`
            );
            setMeteoData(response.data);
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
            <div className="flex">
                <form onSubmit={handlerMeteo}>
                    <label>Nom de la Ville</label>
                    <input type="text"
                           name="ville"
                           className="ville"
                           id="ville"
                           required autoComplete="off"
                           placeholder="ex: Montpellier"/>
                        <input type="submit" value="Rechercher" className="btn" />
                </form>
            </div>
        </section>
        <section className="meteo">
            <div className="afficher-meteo" id="afficher-meteo">
            </div>
        </section>
        <section>
            {meteoData ? (
                <div className="meteo">
                    <h1>{meteoData.name}</h1>
                    <p>Description : {meteoData.weather[0].description}</p>
                    <img className="img"
                         src={`http://openweathermap.org/img/wn/${meteoData.weather[0].icon}@2x.png`}
                         alt={meteoData.weather[0].description}
                         title={meteoData.weather[0].description}
                    />
                    <p>Température : {meteoData.main.temp} °C</p>
                    <p>Température min : {meteoData.main.temp_min} °C</p>
                    <p>Température max : {meteoData.main.temp_max} °C</p>
                    <p><FaWind /> {meteoData.wind.speed} km/h</p>
                    <p> <IoWater/> {meteoData.main.humidity} %</p>
                </div>
            ) : (
                <p>Aucune donnée météo disponible.</p>
            )}

        </section>
    </>
  )
}

export default App
