import {createElement} from "../modules/createElement";

class DropdownOption {

    constructor(data) {
        this.data = data;
    }

    getDropdownOptionDOM() {

        let $option = createElement("li");
        let $link = createElement("a", null, this.data["name"], {"href": "#"});
        $option.appendChild($link);

        return $option;

    }

}

export {DropdownOption};