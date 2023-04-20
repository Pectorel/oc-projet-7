import {createElement} from "../modules/createElement";

class Tag {


    constructor(data) {

        this.data = data;

    }

    getTagDOM() {

        let $tag = createElement("span", ["badge", "tag", this.data["type"]], this.data["name"], {"data-search-type": this.data["type"]});

        $tag.addEventListener("click", e => {

           if(e) e.preventDefault();

           // We get all selected option related to the tag
           let $targets = document.querySelectorAll("[data-tag-value=\"" + $tag.textContent + "\"]");
           // We remove the selected class on their parent that hides them
           $targets.forEach(($elem) => {
               $elem.parentElement.classList.remove("selected");
           });

           $tag.remove();

        });

        return $tag;

    }

}

export {Tag}