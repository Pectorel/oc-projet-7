/**
 *
 * Initialize custom events
 *
 * @param sort {SortData}
 */
function init(sort) {

    // When a search has been done
    document.addEventListener("search", e => {


        if(e.detail) {
            let details = e.detail;
            let instance = details.instance;

            // Only works on main recipe search
            if(instance.options && instance.options.name === "main-search")
            {

                let results = instance.search_result;

                // We hide all dropdowns elements
                let $dropdown_options = document.querySelectorAll("[data-tag-value]");
                for (let $option of $dropdown_options)
                {
                    $option.parentElement.classList.add("not-in-recipe");
                }

                for(let row of results)
                {

                    // Ingredients
                    for(let ingredient of row.ingredients)
                    {
                        let val = ingredient["ingredient"].toLowerCase();
                        let $targets = document.querySelectorAll(`.ingredients [data-tag-value="${val}"]`);

                        for(let $target of $targets)
                        {

                            $target.parentElement.classList.remove("not-in-recipe");
                            $target.parentElement.classList.remove("d-none");

                        }

                    }

                    // Appareils
                    if(row["appliance"])
                    {
                        let val = row["appliance"].toLowerCase();
                        let $targets = document.querySelectorAll(`.appliance [data-tag-value="${val}"]`);

                        for(let $target of $targets)
                        {

                            $target.parentElement.classList.remove("not-in-recipe");
                            $target.parentElement.classList.remove("d-none");

                        }
                    }

                    // Ustensiles
                    if(row["ustensils"])
                    {

                        for(let ustensil of row["ustensils"])
                        {
                            let val = ustensil.toLowerCase();
                            let $targets = document.querySelectorAll(`.ustensils [data-tag-value="${val}"]`);

                            for(let $target of $targets)
                            {

                                $target.parentElement.classList.remove("not-in-recipe");
                                $target.parentElement.classList.remove("d-none");

                            }
                        }

                    }


                }


                // We add the quick fix class on dropdown
                let $dropdown_menus = document.querySelectorAll("#tag-btn-container .dropdown-menu");

                for(let $dropdown_menu of $dropdown_menus)
                {
                    $dropdown_menu.classList.add("search-fix");
                }

            }

        }

    });

    // When search is reset
    document.addEventListener("reset", e => {

        if(e.detail && e.detail.instance)
        {
            let instance = e.detail.instance;

            if(instance.options && instance.options.name === "main-search")
            {

                // We remove the quick fix on dropdown
                let $dropdown_menus = document.querySelectorAll("#tag-btn-container .dropdown-menu");

                for(let $dropdown_menu of $dropdown_menus)
                {
                    $dropdown_menu.classList.remove("search-fix");
                }

                // We remove the not-in-recipe class since the search is resetted
                let $not_in_recipes = document.querySelectorAll(".not-in-recipe");
                for (let $elem of $not_in_recipes)
                {
                    $elem.classList.remove("not-in-recipe");
                }

            }
            else if(instance.options && instance.options.name === "dropdown")
            {
                let search = sort.generateSearchJson();
                if(search["entries"].length > 0)
                {
                    sort.search(search);
                }

            }


        }

    });

}



export {init};