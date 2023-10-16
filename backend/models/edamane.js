const axios = require('axios');

//Application Keys
const app_id = '037ad2a2'
const app_key = 'd01dafa0c089f340f1969037b6ceffa2';

async function search(req) {
    //Todo extract query from req
    let query = "milk";

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
        console.log("Count: ", data.length);
        for(let recipe of data){
            console.log(recipe.recipe.label);
        }

        return data[0]["recipe"]["label"];
    } catch (error) {
        console.error(error);
    }

}


module.exports = { search };