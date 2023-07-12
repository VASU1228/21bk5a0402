const express = require('express');
const axios = require('axios');

const myapp = express();
const newport = 3000;

myapp.get('/numbers', async(req,res) => { 
    const { url } = req.query;
    if(!url) { 
        res.status(400).json({error: 'Missing URL Parameter'}); 
        return; 
    } 

const urlArray = Array.isArray(url) ? url : [url]; 
try{ 
    const results =await Promise.all ( 
        urlArray.map(async (url)=> { 
            const response = await axios.get(url);
            return response.data.number; 
        })
    ); 
    res.json({numbers: results}); 

} catch(error) { 
    res.status(500).json({error:'Failed to fetch numbers'});
}
});

myapp.listen(newport, () => { 
    console.log('Number Management service is running on newport ${newport}');
});
