const axios = require('axios');

//Application Keys
const app_id = '037ad2a2'
const app_key = 'd01dafa0c089f340f1969037b6ceffa2';

async function search(req) {
    let query = req.query.query;

    //Make axios request to Edamane API
    const options = {
        method: 'GET',
        url: 'https://api.edamam.com/api/recipes/v2',
        params: {
            type: 'public',
            app_key: app_key,
            app_id: app_id,
            q: query
        }
    }

    try {
        const response = await axios.request(options);
        console.log("Recipes from edamane reached");
        let data = response.data.hits;
        return data;
    } catch (error) {
        console.error(error);
    }

}


module.exports = { search };