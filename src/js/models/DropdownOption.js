import {createElement} from "../modules/createElement";
import {Factory} from "../factories/Factory";
import * as Utils from "../modules/utils";

class DropdownOption {

  constructor(data) {
    this.data = data;
  }

  getDropdownOptionDOM() {

    let $option = createElement("li", null, null, {"data-search-block": this.data["name"].toLowerCase()});
    let $link = createElement("a", null, this.data["name"], {"href": "#", "data-tag-value": this.data["name"].toLowerCase(), "data-tag-type": this.data["type"]});
    $option.appendChild($link);

    $link.addEventListener("click", e => {

      if(e) e.preventDefault();

      let data = {
        "name": $link.getAttribute("data-tag-value"),
        "type": $link.getAttribute("data-tag-type")
      }

      this._selectOption(data);
      $link.parentElement.classList.add("selected");

    });

    return $option;

  }

  _selectOption(data) {


    let $container = document.querySelector(".tags-list");

    /**
     *
     * @type {Tag}
     */
    let tagModel = new Factory(data, "tag");

    let $tagDOM = tagModel.getTagDOM();

    $container.appendChild($tagDOM);

  }

  /**
   *
   * Init dropdown events
   *
   * @param sort {SortData}
   */
  static initEvents(sort) {

    // Get all dropdowns
    let $dropdowns = document.querySelectorAll("#tag-btn-container [data-bs-toggle=\"dropdown\"]");

    // Grow or shrink element when opened or closed
    $dropdowns.forEach( $dropdown => {

      $dropdown.addEventListener("show.bs.dropdown", event => {

        let $parent = $dropdown.closest(".col-lg-2");
        $parent.classList.remove("col-lg-2");
        $parent.classList.add("col-lg-6");

        let $contenteditable = $dropdown.querySelector("span");
        $contenteditable.setAttribute("contenteditable", "");
        $contenteditable.textContent = "";

        // We use a little timeout otherwise it does not focus the element
        setTimeout(() => {
          $contenteditable.focus();
        }, 100);

      });

      $dropdown.addEventListener("hidden.bs.dropdown", event => {

        let $parent = $dropdown.closest(".col-lg-6");
        $parent.classList.remove("col-lg-6");
        $parent.classList.add("col-lg-2");

        let $contenteditable = $dropdown.querySelector("span");
        $contenteditable.removeAttribute("contenteditable");
        $contenteditable.textContent = $contenteditable.getAttribute("data-initial-text");

      });

      // We prevent spacebar from clicking the dropdown button
      $dropdown.addEventListener("keydown", e => {

        if(e && e.keyCode === 32)
        {
          e.preventDefault();

          // We add a space manually to the searchbar since event is completely stopped
          let $searchbar = $dropdown.querySelector("[contenteditable]");
          $searchbar.innerHTML = $searchbar.innerHTML + "&nbsp;";
          document.getSelection().selectAllChildren($searchbar);
          // We place the carret back at the end of contenteditable
          Utils.placeCarret($searchbar);

        }
        // If we press enter
        else if(e && e.keyCode === 13) {
          e.preventDefault();

          // We check how many options there is left
          let $parent = $dropdown.parentElement;
          let $options = $parent.querySelectorAll("[data-search-block]:not(.d-none):not(.not-in-recipe) [data-tag-value]");

          // If only one option left, we select the option
          if($options.length === 1) {
            $options[0].click();
          }
          // Else we check if the value entered is matching a current option
          else if($options.length > 1) {

            // We get the searchbar value
            let $searchbar = $dropdown.querySelector("[contenteditable]");
            let val = $searchbar.textContent.toLowerCase();

            for(let $option of $options) {

              // If an option corresponds to the value entered in searchbar, then we select this option
              if(val === $option.getAttribute("data-tag-value"))
              {
                $option.click();
                break;
              }

            }

          }
        }
      });

    });

    let $contenteditables = document.querySelectorAll("#tag-btn-container [data-placeholder]");

    $contenteditables.forEach( $contenteditable => {
      $contenteditable.setAttribute("data-initial-text", $contenteditable.textContent);

      // We prevent line break in content
      $contenteditable.addEventListener("keydown", e => {

        if(e.keyCode === 13)
        {
          e.preventDefault();
        }

      });
    });

  }

}

export {DropdownOption};
