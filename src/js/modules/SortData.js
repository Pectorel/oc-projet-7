// Search algorithm based on json data
class SortData {

    /**
     *
     * Initialize the search component
     *
     * @param data {array}
     * @param searchParams {Object}
     * @param $container {HTMLElement}
     */
    constructor(data, searchParams, $container) {


        this.data = data;

        this.searchParams = searchParams;

        this.$container = $container;

        this.$blocks = this.$container.querySelectorAll("[data-search-block]");

    }

    /**
     *
     * Search any element corresponding to given needle string
     *
     * @param needle {string}
     * @param display {boolean}
     */
    search(needle= "", display= true) {

        this.show = [];

        for(let data_row of this.data)
        {
            let res = false;

            for(let searchParam of this.searchParams)
            {

                this.data_row = data_row;
                this.searchParam = searchParam;
                res = this._checkData(needle);


                if(!res) {
                    // If option is required we break the loop and don't show the element
                    if(this.searchParam["options"]){
                        if(this.searchParam["options"]["required"]) break;
                    }
                }
                // Else if found then break SearchParams loop (make sure all required checks have been made before)
                else if(this.searchParam["type"] !== "html" || needle.length <= 0) {
                    this.show.push(document.querySelector(`[data-recipe-id="${data_row["id"]}"]`))
                    break;
                }


            }

        }


        if(display) this.display();

    }

    /**
     *
     * Check if element is in given searchParam
     *
     * @param needle {String}
     * @returns {boolean}
     * @private
     */
    _checkData(needle= "") {

        let res = false;
        if(needle.length > 0) needle = needle.toLowerCase();

        if(this.searchParam["type"] === "string")
        {

            let val = this.data_row[this.searchParam["key"]].toLowerCase();
            res = val.includes(needle);

        }
        else if(this.searchParam["type"] === "json")
        {

            let json_object = this.data_row[this.searchParam["key"]];

            for(let object of json_object)
            {

                let val = object[this.searchParam["options"]["json_key"]].toLowerCase();
                res = val.includes(needle);

                if(res) break;

            }

        }
        else if(this.searchParam["type"] === "html")
        {

            let $targets = document.querySelectorAll(this.searchParam["target"]);

            // If no tags has been selected, then we bypass the check
            if($targets.length <= 0 ) {
                res = true;
            }
            else{
                for(let $target of $targets)
                {

                    let needle = $target.textContent.toLowerCase();


                    if($target.classList.contains("ingredient"))
                    {

                        for (let ingredient of this.data_row["ingredients"])
                        {

                            //debugger;
                            let comp = ingredient["ingredient"].toLowerCase()
                            res = comp.includes(needle);
                            if(res)
                            {
                                break;
                            }

                        }


                    }
                    else if($target.classList.contains("appliance"))
                    {

                        res = this.data_row["appliance"].toLowerCase().includes(needle);

                    }
                    else if($target.classList.contains("ustensil"))
                    {

                        for (let ustensil of this.data_row["ustensils"])
                        {
                            res = ustensil.toLowerCase().includes(needle);
                            if(res) break;
                        }

                    }

                    // If at least one element is not present, then we break the loop
                    if(!res) break;

                }
            }


        }

        return res;

    }

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

    resetBlock() {

        for(let $block of this.$blocks)
        {
            $block.classList.remove("d-none");
        }

    }

}

export {SortData};