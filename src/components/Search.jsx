import axios from "axios";
import { useState } from "react";
import Nood from "../assets/nood.png";

const Search = () => {
    const [query, setQuery]  = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");


    const API_Key = 
    "4f0062523fc30ce49d3270f3805441fb782e3d1e3de9b95f7b3e11f0cf91453e";
    const handleSubmit = async (e) => {
        e.preventDefault();

        const URL = 'https://serpapi.com/search.json'

        try {const resp = await axios.get(URL,{
            params: {
                q: query,
                engine: "google",
                google_domain: "google.com.br",
                api_key: API_Key,
                hl: "pt-br",
                gl: "br",
                num: 10,
            },
        });
        const data = await resp.json();
        setResults (data);
    } catch (err) {
        console.error(err.message);
        setError("Ocorreu um erro inesperado");
    }
        
    };
    

    return (
        <div className="App">
            <div className="Logo">
                <h1>Noodle</h1>
                <img src={Nood} alt="Nood" />
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="query" placeholder="Digite sua busca" onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Buscar</button>
            </form>
        </div>
        );
    };

    export default Search;