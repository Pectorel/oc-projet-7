// Import our custom CSS
import '../scss/style.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Custom Imports
import {JsonFetcher} from "./modules/jsonFetcher";
import {Recipe} from "./factories/recipe";
import {createElement} from "./modules/createElement";

async function getRecipes(){

    return new Promise((resolve) => {

        let fetcher = new JsonFetcher("./data/recipes.json");

        fetcher.then((res) => {

            let instance = res.instance;
            let data = res.object;

            resolve(data);

        });

    });

}

function displayRecipes(recipes) {

    // We get the div container that will get all recipes article inserted into it
    const $recipe_section = document.querySelector("#recipes-container");

    let i = 0;
    let $row = null;
    recipes.forEach((recipe) => {

        const recipeModel = Recipe(recipe);

        const recipeCardDOM = recipeModel.getRecipeCardDOM();

        if(i%3 === 0)
        {
            if(i !== 0)
            {
                $recipe_section.appendChild($row);
            }

            $row = createElement("div", ["recipe-line", "row"]);
        }

        $row.appendChild(recipeCardDOM);

        i++;

    });

}

async function init()
{

    let recipes = await getRecipes();
    displayRecipes(recipes);


}

init().then(() => {

});