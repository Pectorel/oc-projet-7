// Search algorithm based on json data
class SortData {

    /**
     *
     * Initialize the search component
     *
     * @param data {Array} - Dataset to search in
     * @param $container {HTMLElement} - Contains all the block to hide or show based on search result
     */
    constructor(data, $container) {

        this.data = data;

        this.$container = $container;
        // We get all the [data-search-block] HTMLElements to hide or show based on search result
        this.$blocks = this.$container.querySelectorAll("[data-search-block]");

    }


    /**
     *
     * Generates the Search Json Object to send to the search function
     *
     * @param key {string} - Indicates which key is used in json data to find the corresponding block on DOM with data-search-block value
     *
     * @returns {Object}
     */
    generateSearchJson(key = "id") {

        let res = {
            "entries" : [],
            "key" : key
        };

        // We get the searchbar value
        let $searchbar = document.querySelector("#recipe-search");
        let val = $searchbar.value;

        // We check that our input has at least 3 characters
        if(val.length >= 3)
        {
            let search_obj = {
                "value": val,
                "type": "group",
                "options" : {
                    "nullable": true,
                    "group_type": "or",
                    "group" : [
                        {
                            "type": "string",
                            "key": "name"
                        },
                        {
                            "type": "json",
                            "key": "ingredients",
                            "options" : {
                                "json_key": "ingredient"
                            }
                        },
                        {
                            "type": "string",
                            "key": "description"
                        }
                    ]
                }
            };

            res["entries"].push(search_obj);
        }



        // We get the tags
        let $tags = document.querySelectorAll(".tag");

        if($tags !== null)
        {

            for(let $tag of $tags)
            {

                let type = $tag.getAttribute("data-search-type");

                let search_obj = {};

                // For each tags, we set the correct type to search in the database
                switch (type) {
                    case "ingredient":
                        search_obj = {
                            "type": "json",
                            "key": "ingredients",
                            "options" : {
                                "json_key": "ingredient"
                            }
                        };
                        break;
                    case "appliance":
                        search_obj = {
                            "type": "string",
                            "key": "appliance"
                        };
                        break;
                    case "ustensil":
                        search_obj = {
                            "type": "array",
                            "key": "ustensils"
                        }
                        break;
                    default:
                        search_obj = null;
                        break;
                }


                if(search_obj !== null)
                {
                    search_obj["value"] = $tag.textContent;

                    res["entries"].push(search_obj);
                }

            }

        }

        return res;

    }

    /**
     *
     * Search any element corresponding to given search Json Object
     *
     * @param search {Object}
     * @param display {boolean}
     */
    search(search, display= true) {

        // Initializing array that will contains all html elements reference to show
        this.show = [];

        for(let data_row of this.data)
        {
            let res = true;

            for(let field of search["entries"])
            {

                this.data_row = data_row;
                this.field = field;
                res = this["_" + field["type"]]();

                if(!res) break;


            }

            // If result is indeed in search
            if(res)
            {
                // We push the block to the array containing all showable blocks
                this.show.push(document.querySelector(`[data-search-block="${data_row[search["key"]]}"]`));
            }

        }

        // display the valid blocks
        if(display) this.display();

    }

    /**
     *
     * Check if string is equal or included
     *
     * @returns {boolean}
     * @private
     */
    _string() {

        let res;
        let needle = this.field["value"].toLowerCase();

        let val = this.data_row[this.field["key"]].toLowerCase();
        if(this.field["options"] && this.field["options"]["equals"])
        {
            res = val === needle;
        }
        else
        {
            res = val.includes(needle);
        }

        return res;
    }

    /**
     *
     * check if string is included in json data
     *
     * @returns {boolean}
     * @private
     */
    _json() {

        let res = false;
        let needle = this.field["value"].toLowerCase();

        let json_object = this.data_row[this.field["key"]];
        for(let object of json_object)
        {

            let val = object[this.field["options"]["json_key"]].toLowerCase();
            res = val.includes(needle);

            if(res) break;

        }

        return res;

    }

    /**
     *
     * check if data is included in array
     *
     * @returns {boolean}
     * @private
     */
    _array() {

        let res = false;
        let needle = this.field["value"].toLowerCase();

        for(let row of this.data_row[this.field["key"]])
        {

            let val = row.toLowerCase();
            res = val.includes(needle);

            if(res) break;

        }

        return res;

    }

    /**
     *
     * Make multiple checks with one value (can be "or" or "and")
     *
     * @returns {boolean}
     * @private
     */
    _group() {

        let res = false;
        let fields = this.field;

        // for all fields in group
        for(let field of fields["options"]["group"])
        {

            // We put the value inside the field json object (this way we don't have to write it for every check inside a group)
            field["value"] = fields["value"];

            // we change the current field to match the field inside the group
            this.field = field;
            // We call the corresponding method
            res = this["_" + field["type"]]();

            // If only one field in group needs to be valid
            if(fields["options"]["group_type"] === "or")
            {
                if(res) break;
            }
            // Else if every field have to be valid, we break at doon as the string is not found
            else if(!res) break;


        }

        return res;

    }

    /**
     *
     * Display all blocks based on search result
     *
     */
    display() {

        for(let $block of this.$blocks)
        {

            $block.classList.add("d-none");

            if(this.show.includes($block))
            {
                $block.classList.remove("d-none");
            }

        }

    }

    /**
     *
     * Show all blocks
     *
     * @param limit {int | null}
     *
     */
    resetBlock(limit = null) {

        // If a limit is set, then we hide every block before showing them
        if(limit)
        {
            for(let $block of this.$blocks)
            {
                $block.classList.add("d-none");
            }
        }

        let i = 0;
        for(let $block of this.$blocks)
        {
            if(limit !== null && i >= limit) break;

            $block.classList.remove("d-none");

            i++
        }

    }

    /**
     *
     * Init all EventListeners related to the SortData Object
     *
     * @param sort {SortData}
     * @param tags {Array}
     */
    static initEvents(sort, tags) {
        let $recipe_searchbar = document.querySelector("#recipe-search");

        $recipe_searchbar.addEventListener("input", e => {

            // We check that at least 3 characters are in the input
            let val = $recipe_searchbar.value;
            if(val.length >= 3)
            {
                let search = sort.generateSearchJson();
                sort.search(search);
            }
            else {

                // We check if there are search parameters still
                let search = sort.generateSearchJson();

                // If yes, then we do the search
                if(search["entries"].length > 0)
                {
                    sort.search(search);
                }
                // Else we reset the display
                else
                {
                    sort.resetBlock();
                }

            }

        });

        let $dropdown_options = document.querySelectorAll("[data-tag-value]");

        $dropdown_options.forEach($dropdown_option => {

            $dropdown_option.addEventListener("click", e => {

                if(e) e.preventDefault();

                let search = sort.generateSearchJson();
                sort.search(search);

            });

        });

        document.addEventListener("click", e => {

            // Tag click event listener
            if(e.target && e.target.classList.contains("tag")) {



                let search =  sort.generateSearchJson();
                if(search["entries"].length > 0)
                {
                    sort.search(search);
                }
                else
                {
                    sort.resetBlock();
                }


            }

        });

        this.initAutocompleteEvents(tags);
    }

    /**
     *
     * Initialize autocomplete dropdowns events
     *
     * @param tags {Array}
     */
    static initAutocompleteEvents(tags) {

        // Autocomplete tags
        let $autocompletes = document.querySelectorAll("[data-autocomplete]");
        $autocompletes.forEach(($elem) => {

            let type = $elem.getAttribute("data-autocomplete");
            let data = tags[type].entries;
            let autocomplete = new SortData(data, tags[type].container);

            $elem.addEventListener("input", (e) => {

                if($elem.textContent.length > 0)
                {
                    let search = {
                        "entries" : [
                            {
                                "value": $elem.textContent,
                                "type": "string",
                                "key": "name"
                            }
                        ],
                        "key": "name"
                    };

                    autocomplete.search(search);
                }
                else {
                    autocomplete.resetBlock(30);
                }

            });

            $elem.closest("[data-bs-toggle=\"dropdown\"]").addEventListener("hidden.bs.dropdown", (e) => {

                autocomplete.resetBlock(30);
            });

        });

    }

}

export {SortData};