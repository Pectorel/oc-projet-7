// Impoorts
import {Recipe} from "../models/Recipe";
import {DropdownOption} from "../models/DropdownOption";

class Factory {

    /**
     *
     * Create an element base on type and data provided
     *
     * @param data
     * @param type
     * @returns {Recipe | Dropdown | null}
     */
    constructor(data, type) {

        let res = null;

        switch (type)
        {
            case "recipe":
                res = new Recipe(data);
                break;
            case "dropdown":
                res = new DropdownOption(data);
                break;
            default:
                throw "Unknown type, check you factory calls"
        }

        return res;

    }

}

export {Factory};