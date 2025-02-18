
import './App.scss'

import {FormEvent, useState} from "react";
import axios from "axios";
import {MeteoDataProps} from "./interface.ts";
import {FaWind} from "react-icons/fa";
import {IoWater} from "react-icons/io5";
import {GoSun} from "react-icons/go";
import {BiSearch} from "react-icons/bi";

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
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const ville: string | null = formData.get('ville') as string;

        checkMeteo(ville);

    }

  return (
    <>
        <h1>NaoMétéo <GoSun /></h1>
        <div className="formulaire">
            <form onSubmit={handlerMeteo}>
                <label>Nom de la Ville</label>
                <div className="formulaire__inputs">
                    <input type="text"
                           name="ville"
                           className="ville"
                           id="ville"
                           required autoComplete="off"
                           placeholder="ex: Montpellier"/>
                    <button type="submit" className="btn" >
                        <BiSearch />
                    </button>
                </div>
            </form>
        </div>
        <section>
            {meteoData ? (
                <div>
                    <h2>{meteoData.name}</h2>
                    <div className="meteo">
                        <div className="meteo__card">
                            <p>Description :</p>
                            <span>{meteoData.weather[0].description}</span>
                            <img className="img"
                                 src={`http://openweathermap.org/img/wn/${meteoData.weather[0].icon}@2x.png`}
                                 alt={meteoData.weather[0].description}
                                 title={meteoData.weather[0].description}
                            />
                        </div>
                        <div className="meteo__card">
                            <p>Température :</p>
                            <span>{meteoData.main.temp} °C</span>
                            <p>Température min :</p>
                            <p>{meteoData.main.temp_min} °C</p>
                            <p>Température max :</p>
                            <p>{meteoData.main.temp_max} °C</p>
                        </div>
                        <div className="meteo__card">
                            <p><FaWind /> {meteoData.wind.speed} km/h</p>
                            <p> <IoWater/> {meteoData.main.humidity} %</p>
                        </div>

                    </div>
                </div>
            ) : (
                <p>Aucune donnée météo disponible.</p>
            )}

        </section>
    </>
  )
}

export default App
