import axios from "axios";
import { useState } from "react";
import Nood from "../assets/nood.png";


const Search = () => {
    const [query, setQuery]  = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query) {
            return;
        }
        setLoading(true);
        try {
            const URL = "http://localhost:4000/search"
            const resp = await axios.get(URL, {
                params: {
                    query: query
                }
            })
            const data = resp.data.organic_results || [];
            setResults(data);
        setResults (data);
    } catch (err) {
        console.error(err.message);
        setError("Ocorreu um erro inesperado")
    } finally {
        setLoading(false);
    }     
    };
    
    return (
        <div className="App">
            <div className="Logo">
                <h1>Noodle</h1>
                <img src={Nood} alt="Nood" style={{ width: '200px', height: '200px'}} />
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="query" placeholder="Digite sua busca" onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Buscar</button>
            </form>
            <div>
                <ul>
                    {error ? (<h4>{error}</h4>) :
                    loading ? (
                    <h4>Carregando...</h4>
                    ) : (
                    results.map((item, index) => {

                        return (
                        <li key={index}>
                            <a 
                            href={item.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            {item.title}</a>
                            <p>{item.snippet}</p>

                        </li>
                        );
                    }))
                    };
                </ul>
            </div>
        </div>
        )
    };

    export default Search;