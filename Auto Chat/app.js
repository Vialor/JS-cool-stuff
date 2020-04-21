const fetch = require("node-fetch");
const express = require("express");

const app = express();

app.use(express.static('public'));

app.listen(3000, ()=>console.log("app is running at port 3000"));

app.get('/reply/:keyword', async(req, res)=>{
    const encoded_keyword = encodeURI(req.params.keyword);
    const api_url = `http://api.qingyunke.com/api.php?key=free&appid=0&msg=${encoded_keyword}`;
    const api_res = await fetch(api_url);
    const json = await api_res.json();
    res.json(json.content);
});