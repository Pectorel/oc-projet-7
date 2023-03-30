// Import our custom CSS
import '../scss/style.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Custom Imports
import {JsonFetcher} from "./modules/JsonFetcher";
import {Factory} from "./factories/Factory";
import {createElement} from "./modules/createElement";
import * as DropdownEvent from "./modules/dropdownEvents";
import {SortData} from "./modules/SortData";
import {Autocomplete} from "./modules/Autocomplete";


// Global variables
/**
 * @type {SortData}
 */
let sort;

async function getRecipes(){

    return new Promise((resolve) => {

        let fetcher = new JsonFetcher("./data/recipes.json");

        fetcher.then((res) => {

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
    let $row = createElement("div", ["recipe-line", "row", "align-content-stretch", "gx-5", "gy-5", "mb-5"]);
    $recipe_section.appendChild($row);

    recipes.forEach((recipe) => {

        // Recipe Card

        /**
         * @type {Recipe}
         */
        const recipeModel = new Factory(recipe, "recipe");

        const recipeCardDOM = recipeModel.getRecipeCardDOM();

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

    let k = 0;

    for(const ingredient of ingredients) {
        /**
         *
         * @type {DropdownOption}
         */
        let dropdownModel = new Factory({"name": ingredient, "type": "ingredient"}, "dropdown");

        let $option = dropdownModel.getDropdownOptionDOM();
        if(k >= 30) $option.classList.add("d-none");
        $ingredient_dropdown.appendChild($option);

        k++;
    }

    // Appliances
    let $appliance_dropdown = document.querySelector(".appliance .dropdown-menu");
    k = 0;
    for(const appliance of appliances) {

        /**
         *
         * @type {DropdownOption}
         */
        let dropdownModel = new Factory({"name": appliance, "type": "appliance"}, "dropdown");

        let $option = dropdownModel.getDropdownOptionDOM();
        if(k >= 30) $option.classList.add("d-none");
        $appliance_dropdown.appendChild($option);

        k++;
    }

    // Ustensils
    let $ustensils_dropdown = document.querySelector(".ustensils .dropdown-menu");
    k = 0;
    for(const ustensil of ustensils) {

        /**
         *
         * @type {DropdownOption}
         */
        let dropdownModel = new Factory({"name": ustensil, "type": "ustensil"}, "dropdown");

        let $option = dropdownModel.getDropdownOptionDOM();
        if(k >= 30) $option.classList.add("d-none");
        $ustensils_dropdown.appendChild($option);

        k++;
    }

}

async function init()
{

    let recipes = await getRecipes();
    await displayRecipes(recipes);

    // Always put required fields first
    let searchParams = [
        {
            "target": ".tag",
            "type": "html",
            "options": {
                "required": true
            }
        },
        {
            "key": "name",
            "type": "string"
        },
        {
            "key": "ingredients",
            "type": "json",
            "options": {
                "json_key": "ingredient"
            }
        },
        {
            "key": "description",
            "type": "string"
        }

    ];

    sort = new SortData(recipes, searchParams, document.querySelector(".recipe-line"));

}

init().then(() => {

    DropdownEvent.init();
    Autocomplete.initEvents();

    let $recipe_searchbar = document.querySelector("#recipe-search");

    $recipe_searchbar.addEventListener("input", e => {

        let val = $recipe_searchbar.value;
        if(val.length >= 3)
        {
            sort.search(val);
        }
        else {
            sort.resetBlock();

            let $tag = document.querySelector(".tag");

            if($tag !== undefined)
            {
                sort.search();
            }

        }

    });

    let $dropdown_options = document.querySelectorAll("[data-tag-value]");

    $dropdown_options.forEach($dropdown_option => {

        $dropdown_option.addEventListener("click", e => {

            if(e) e.preventDefault();

            let val = ($recipe_searchbar.value.length >=3) ? $recipe_searchbar.value : "";

            sort.search(val);

        });

    });

});