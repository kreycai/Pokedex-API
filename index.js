import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from "path";
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 3000
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static(path.join("public")));

let condition = false;
// export {condition};

let pokedex = [];
let numeroDePok = "0";

async function poke (){


    console.time();
    try {
    const respostaDaRequisicao = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numeroDePok}`);
    const respReqParaJson = await respostaDaRequisicao.json();
    const pokesList = respReqParaJson.results

    const ArrayDosResults = pokesList.map(async pokemons => {
        const urlsBrut = await fetch(pokemons.url)
        const urlsJson = await urlsBrut.json()
        const imagem = urlsJson.sprites.front_default
        const name = urlsJson.name
        let id = urlsJson.id
        if(id > 1000){
            id = id - 9000
        }
        const statusHP = urlsJson.stats[0].base_stat
        const StatusAtaque = urlsJson.stats[1].base_stat
        const StatusDefesa = urlsJson.stats[2].base_stat
        const StatusSuperAtaque = urlsJson.stats[3].base_stat
        const StatusSuperDefesa = urlsJson.stats[4].base_stat
        const StatusVelocidade = urlsJson.stats[5].base_stat

        return {
            id: id,
            imagem: imagem,
            name: name,
            StatusHP: statusHP,
            StatusAtaque: StatusAtaque,
            StatusDefesa: StatusDefesa,
            StatusSuperAtaque: StatusSuperAtaque,
            StatusSuperDefesa: StatusSuperDefesa,
            StatusVelocidade: StatusVelocidade,
        }
        
    })
    
    pokedex = await Promise.all(ArrayDosResults)
    } catch (error) {
        condition = true;
        numeroDePok = "9";
    }   
    console.timeEnd();
}



    app.get('/', async (req, res) => {
        await poke();
        res.render('home', {pokedex, numeroDePok,condition});
    })


    app.get('/add', async(req, res) => {
        res.render('index', {pokedex,numeroDePok,condition});
        condition = false;



    })


    app.post('/registro', (req, res) => {
        let newpoke = req.body
        newpoke.id = pokedex.length + 1
        console.log(newpoke)
        pokedex.push(newpoke)
        res.redirect('/add')
    })

    app.post('/pokemons', async (req, res) => {
        numeroDePok = req.body.number
        await poke()
        res.redirect('/add')
    })

    app.listen(port, console.log(`Servidor rodando em http://localhost:${port}`));



