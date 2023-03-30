class Autocomplete{

    constructor($data_block) {

        this.$data_block = $data_block;
        this.$data_options = this.$data_block.querySelectorAll("[data-autocomplete-option]");

    }

    sortData(needle) {

        needle = needle.toLowerCase();

        for(let $option of this.$data_options)
        {

            // We get the display target to hide or show
            let $target = $option.closest("[data-autocomplete-display-target]");

            // We add this class to hide every items
            $target.classList.add("d-none");

            // If the string is contained in the textcontent of HTMLElement
            if($option.textContent.toLowerCase().includes(needle) !== false)
            {
                // We remove the d-none class to show the element
                $target.classList.remove("d-none");
            }


        }

    }



    resetBlock()
    {

        let k = 0;
        for(let $option of this.$data_options)
        {
            let $target = $option.closest("[data-autocomplete-display-target]");

            if(k < 30)
            {
                $target.classList.remove("d-none");
            }
            else
            {
                $target.classList.add("d-none");
            }

            k++;


        }

    }

    static initEvents() {

        let $data_autocomplete = document.querySelectorAll("[data-autocomplete]");

        for(let $autocomplete of $data_autocomplete)
        {

            let target = $autocomplete.getAttribute("data-autocomplete");
            let $autocomplete_block = document.querySelector(target);
            let sort = new Autocomplete($autocomplete_block);


            $autocomplete.addEventListener("input", e => {

                let val = $autocomplete.textContent;

                if(val.length >= 3)
                {
                    sort.sortData(val);
                }
                else
                {
                    sort.resetBlock();
                }

            });

            // We check if autocomplete is in dropdown
            let $dropdown = $autocomplete.closest(".dropdown-toggle");
            if($dropdown !== undefined)
            {

                $dropdown.addEventListener("hidden.bs.dropdown", e => {
                    sort.resetBlock();
                });

            }

        }

    }

}

export {Autocomplete};