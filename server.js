import express from 'express';
import cors from "cors";
import axios from "axios";

const porta = 4000;

const app = express();

app.use(cors());

app.get("/search", async (req,res) => {
    const {query} = req.query
    const API_KEY = ""
    const URL = "https://serpapi.com/search.json";
    try {
        const response = await axios.get(URL, {
            params: {
                q: query,
                engine: "google",
                google_domain: "google.com.br",
                api_key: API_KEY,
                hl: "pt-br",
                gl: "br",
                num: 10,
            },
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error : "Ocorreu um erro inesperado" });
    }
})

app.listen(porta, () => {
    console.log(`O servidor Proxy está rodando na porta `,porta);
})