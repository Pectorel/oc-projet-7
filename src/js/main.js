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


    // Setting all filters arrays
    let ingredients = [];
    let appliances = [];
    let ustensils = [];


    let i = 0;
    let $row = null;
    recipes.forEach((recipe) => {

        // Recipe Card
        const recipeModel = Recipe(recipe);

        const recipeCardDOM = recipeModel.getRecipeCardDOM();

        // Every three element, we create a row
        if(i%3 === 0)
        {
            if(i !== 0)
            {
                $recipe_section.appendChild($row);
            }

            $row = createElement("div", ["recipe-line", "row", "align-content-stretch", "gx-5", "mb-5"]);
        }

        $row.appendChild(recipeCardDOM);


        // Filters array push
        if(recipe.hasOwnProperty("ingredients"))
        {

            for(let j = 0; j < recipe["ingredients"].length; j++)
            {
                let ingredient = recipe["ingredients"][j];

                if(!ingredients.includes(ingredient["ingredient"].toLowerCase()))
                {
                    ingredients.push(ingredient["ingredient"].toLowerCase());
                }

            }

        }

        // Cooking tools
        if(recipe.hasOwnProperty("appliance"))
        {

            if(!appliances.includes(recipe["appliance"].toLowerCase()))
            {
                appliances.push(recipe["appliance"].toLowerCase());
            }

        }

        // Ustensils
        if(recipe.hasOwnProperty("ustensils"))
        {

            for(let j = 0; j < recipe["ustensils"].length; j++)
            {
                let ustensil = recipe["ustensils"][j];

                if(!ustensils.includes(ustensil.toLowerCase()))
                {
                    ustensils.push(ustensil.toLowerCase());
                }

            }

        }

        i++;

    });


    // We create the dropdowns DOM options
    let $ingredient_dropdown = document.querySelector(".ingredients .dropdown-menu");
    ingredients.forEach((ingredient) => {

        let $option = createElement("li");
        let $link = createElement("a", null, ingredient, {"href": "#"});
        $option.appendChild($link);

        $ingredient_dropdown.appendChild($option);

    });

    // Appliances
    let $appliance_dropdown = document.querySelector(".appliance .dropdown-menu");
    appliances.forEach((appliance) => {

        let $option = createElement("li");
        let $link = createElement("a", null, appliance, {"href": "#"});
        $option.appendChild($link);

        $appliance_dropdown.appendChild($option);

    });

    // Ustensils
    console.log(ustensils);
    let $ustensils_dropdown = document.querySelector(".ustensils .dropdown-menu");
    ustensils.forEach((ustensil) => {

        let $option = createElement("li");
        let $link = createElement("a", null, ustensil, {"href": "#"});
        $option.appendChild($link);

        $ustensils_dropdown.appendChild($option);

    });

}

async function init()
{

    let recipes = await getRecipes();
    displayRecipes(recipes);


}

init().then(() => {

});