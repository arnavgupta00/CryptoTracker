import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { render } from "ejs";


const app = express();
const port = "3000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res) =>{
    res.render("index.ejs");
});

app.post("/submit",async (req,res)=>{
    
    try {
        const result = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${req.body.symbol}`);
        
        res.render("index.ejs", {data : result.data});
    } catch (error) {
        res.render("index.ejs", {errorC : error.message});
    }
});

app.listen(port ,()=>{
    console.log(`server has started on port: ${port}`);
});