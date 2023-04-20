// Imports
import {createElement} from "../modules/createElement";
import * as Utils from "../modules/utils";

/**
 *
 * Create A Recipe object with given data
 *
 */
class Recipe {

  /**
   *
   * @param data
   * @constructor
   */
  constructor(data) {

    this.data = data;

  }


  /**
   *
   *
   *
   * @returns {HTMLElement}
   */
  getRecipeCardDOM() {

    let $article = createElement("article", ["col-lg-4"], null, {"data-search-block": this.data.id});

    let $card = createElement("div", ["card"]);

    let $card_thumb = createElement("div", ["card-thumb"]);

    let $card_content = createElement("div", ["card-content", "container"]);

    let $card_content_header = createElement("header", ["card_content_header", "row"]);
    let $card_title = createElement("h2", ["card-title", "col-lg-8"], this.data["name"]);
    let $card_time_paragraph = createElement("p", ["card-time-container", "col-lg-4", "fw-bold", "text-end"]);
    let $card_time_icon = createElement("i", ["card-time-icon", "fa-regular", "fa-clock"]);
    let $card_time_text = createElement("span", ["card-time-text"], `${this.data["time"]} min`);

    // Append elements to card-time-container
    $card_time_paragraph.appendChild($card_time_icon);
    $card_time_paragraph.appendChild($card_time_text);

    // Append elements to card-content-header
    $card_content_header.appendChild($card_title);
    $card_content_header.appendChild($card_time_paragraph);

    let $card_content_details = createElement("div", ["card-content-details", "row"]);

    let $card_ingredients_container = createElement("div", ["card-ingredients", "col-lg-6"]);

    for (let i = 0; i < this.data["ingredients"].length; i++)
    {
      let ingredient = this.data["ingredients"][i];

      let $card_ingredient = createElement("span", ["card-ingredient-line", "d-block"]);
      let $card_ingredient_name = createElement("strong", ["card-ingredient-name"], ingredient["ingredient"]);
      let quantity_text = "";

      // We check if we have a quantity to show
      if(ingredient.hasOwnProperty("quantity"))
      {
        quantity_text = ": " + ingredient["quantity"];
        // We check if there is a unit to diplay
        if(ingredient.hasOwnProperty("unit"))
        {
          quantity_text+=" " + ingredient["unit"];
        }
      }


      let $card_ingredient_quantity = createElement("span", ["card-ingredient-quantity"], quantity_text);

      // We append every ingredient line to the ingredient container div
      $card_ingredient.appendChild($card_ingredient_name);
      $card_ingredient.appendChild($card_ingredient_quantity);
      $card_ingredients_container.appendChild($card_ingredient);

    }


    let $card_details_desc = createElement("p", ["card-details-description", "col-lg-6"], Utils.truncate(this.data["description"], 175));


    // Append elements to card-content-details div
    $card_content_details.appendChild($card_ingredients_container);
    $card_content_details.appendChild($card_details_desc);

    // Append all elements to card-content div
    $card_content.appendChild($card_content_header);
    $card_content.appendChild($card_content_details);

    // Append all elements to card div
    $card.appendChild($card_thumb);
    $card.appendChild($card_content);

    // Append card to article
    $article.appendChild($card);

    return $article;

  }

}

export {Recipe};
