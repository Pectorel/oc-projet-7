import {createElement} from "../modules/createElement";
import {Factory} from "../factories/Factory";

class DropdownOption {

    constructor(data) {
        this.data = data;
    }

    getDropdownOptionDOM() {

        let $option = createElement("li", null, null, {"data-autocomplete-display-target": ""});
        let $link = createElement("a", null, this.data["name"], {"href": "#", "data-tag-value": this.data["name"], "data-tag-type": this.data["type"], "data-autocomplete-option": ""});
        $option.appendChild($link);

        $link.addEventListener("click", e => {

            if(e) e.preventDefault();

            let data = {
                "name": $link.getAttribute("data-tag-value"),
                "type": $link.getAttribute("data-tag-type")
            }
            this._selectOption(data);

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



}

export {DropdownOption};