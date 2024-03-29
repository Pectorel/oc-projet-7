/**
 *
 * Initialize custom events
 *
 * @param sort {SortData}
 * @param autocompletes {[SortData]}
 */
function init(sort, autocompletes) {

  // Sort Data Events

  // When a search has been done
  document.addEventListener("search", e => {

    if (e.detail) {
      let details = e.detail;
      let instance = details.instance;

      // Only works on main recipe search
      if (instance.options && instance.options.name === "main-search") {

        let results = instance.search_result;

        // We hide all dropdowns elements
        let $dropdown_options = document.querySelectorAll("[data-tag-value]");
        for (let $option of $dropdown_options) {
          $option.parentElement.classList.add("not-in-recipe");
        }

        for (let row of results) {

          // Ingredients
          for (let ingredient of row.ingredients) {
            let val = ingredient["ingredient"].toLowerCase();
            let $targets = document.querySelectorAll(`.ingredients [data-tag-value="${val}"]`);

            for (let $target of $targets) {

              $target.parentElement.classList.remove("not-in-recipe");
              $target.parentElement.classList.remove("d-none");

            }

          }

          // Appareils
          if (row["appliance"]) {
            let val = row["appliance"].toLowerCase();
            let $targets = document.querySelectorAll(`.appliance [data-tag-value="${val}"]`);

            for (let $target of $targets) {

              $target.parentElement.classList.remove("not-in-recipe");
              $target.parentElement.classList.remove("d-none");

            }
          }

          // Ustensiles
          if (row["ustensils"]) {

            for (let ustensil of row["ustensils"]) {
              let val = ustensil.toLowerCase();
              let $targets = document.querySelectorAll(`.ustensils [data-tag-value="${val}"]`);

              for (let $target of $targets) {

                $target.parentElement.classList.remove("not-in-recipe");
                $target.parentElement.classList.remove("d-none");

              }
            }

          }


        }

      }

    }

  });

  // When search is reset
  document.addEventListener("reset", e => {

    if (e.detail && e.detail.instance) {
      let instance = e.detail.instance;

      // If main search (search bar)
      if (instance.options && instance.options.name === "main-search") {

        // We remove the not-in-recipe class since the search is resetted
        let $not_in_recipes = document.querySelectorAll(".not-in-recipe");
        for (let $elem of $not_in_recipes) {
          $elem.classList.remove("not-in-recipe");
        }

        // We reset all autocompletes blocks
        for (let autocomplete of autocompletes) {

          autocomplete.resetBlock(30);

        }

      }
      // Else if tag search (text search in dropdowns)
      else if (instance.options && instance.options.name === "dropdown") {
        // If dropdown is reset, then we search again to prevent some "d-none" block to be hidden but in recipe
        let search = sort.generateSearchJson();
        if (search["entries"].length > 0) {
          sort.search(search);
        }

      }

    }

  });

}


export {init};
