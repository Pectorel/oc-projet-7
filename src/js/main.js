// Import our custom CSS
import '../scss/style.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import {auto} from "@popperjs/core";

// Custom Imports
import {JsonFetcher} from "./modules/JsonFetcher";
import {Factory} from "./factories/Factory";
import {SortData} from "./modules/SortData";
import {DropdownOption} from "./models/DropdownOption";
import * as CustomEvents from "./modules/customEvents";


// Global variables

/**
 * @type {SortData}
 */
let sort;

/**
 * @type {Object}
 */
let tags;

async function getRecipes() {

  return new Promise((resolve) => {

    /**
     *
     * @type {Promise}
     */
    let fetcher = new JsonFetcher("./data/recipes.json");

    fetcher.then((res) => {

      let data = res.object;

      resolve(data);

    });

  });

}

async function displayRecipes(recipes) {

  // We get the div container that will get all recipes article inserted into it
  const $recipe_section = document.querySelector(".recipe-line");

  // Setting all filters arrays
  let tag_dropdowns = {
    "ingredients": {
      "entries": [],
      "container": document.querySelector(".ingredients .dropdown-menu"),
    },
    "appliances": {
      "entries": [],
      "container": document.querySelector(".appliance .dropdown-menu"),
    },
    "ustensils": {
      "entries": [],
      "container": document.querySelector(".ustensils .dropdown-menu"),
    }
  }
  let k = 0;
  let i = 0;
  let l = 0;

  recipes.forEach((recipe) => {

    // Recipe Card

    /**
     * @type {Recipe}
     */
    const recipeModel = new Factory(recipe, "recipe");
    const recipeCardDOM = recipeModel.getRecipeCardDOM();

    $recipe_section.appendChild(recipeCardDOM);

    // Filters array push
    if (recipe.hasOwnProperty("ingredients")) {

      for (let j = 0; j < recipe["ingredients"].length; j++) {
        let ingredient = recipe["ingredients"][j];

        if (!tag_dropdowns.ingredients.entries.some(item => item.name === ingredient["ingredient"].toLowerCase())) {
          let name = ingredient["ingredient"].toLowerCase();
          tag_dropdowns.ingredients.entries.push({"name": name});

          /**
           *
           * @type {DropdownOption}
           */
          let dropdownModel = new Factory({"name": name, "type": "ingredient"}, "dropdown");

          let $option = dropdownModel.getDropdownOptionDOM();
          if (k >= 30) $option.classList.add("d-none");
          tag_dropdowns.ingredients.container.appendChild($option);

          k++;
        }

      }

    }

    // Cooking tools
    if (recipe.hasOwnProperty("appliance")) {

      if (!tag_dropdowns.appliances.entries.some(item => item.name.includes(recipe["appliance"].toLowerCase()))) {
        let name = recipe["appliance"].toLowerCase();
        tag_dropdowns.appliances.entries.push({"name": name});

        /**
         *
         * @type {DropdownOption}
         */
        let dropdownModel = new Factory({"name": name, "type": "appliance"}, "dropdown");

        let $option = dropdownModel.getDropdownOptionDOM();
        if (i >= 30) $option.classList.add("d-none");
        tag_dropdowns.appliances.container.appendChild($option);

        i++;
      }

    }

    // Ustensils
    if (recipe.hasOwnProperty("ustensils")) {

      for (let j = 0; j < recipe["ustensils"].length; j++) {
        let ustensil = recipe["ustensils"][j];

        if (!tag_dropdowns.ustensils.entries.some(item => item.name.includes(ustensil.toLowerCase()))) {
          let name = ustensil.toLowerCase();
          tag_dropdowns.ustensils.entries.push({"name": name});

          /**
           *
           * @type {DropdownOption}
           */
          let dropdownModel = new Factory({"name": ustensil, "type": "ustensil"}, "dropdown");

          let $option = dropdownModel.getDropdownOptionDOM();
          if (l >= 30) $option.classList.add("d-none");
          tag_dropdowns.ustensils.container.appendChild($option);

          l++;

        }

      }

    }

  });

  return tag_dropdowns;

}

async function init() {

  let recipes = await getRecipes();
  tags = await displayRecipes(recipes);
  sort = new SortData(recipes, document.querySelector(".recipe-line"), {"name": "main-search"});


}

init().then(() => {

  DropdownOption.initEvents(sort);
  let autocompletes = SortData.initEvents(sort, tags);
  CustomEvents.init(sort, autocompletes);


});
