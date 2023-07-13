const express = require('express');
const app = express(); 
const openai = require('openai')





app.get('/', (req,res)=>{

res.send('hello world');

})

app.listen(3000, ()=> console.log('hello world'));

