import {createElement} from "../modules/createElement";

class Tag {


    constructor(data) {

        this.data = data;

    }

    getTagDOM() {

        let $tag = createElement("span", ["badge", "tag", this.data["type"]], this.data["name"], {"data-search-type": this.data["type"]});

        $tag.addEventListener("click", e => {

           if(e) e.preventDefault();

           let $targets = document.querySelectorAll("[data-tag-value=\"" + $tag.textContent + "\"]");
           $tag.remove();
           $targets.forEach(($elem) => {

               $elem.parentElement.classList.remove("selected");

           });

        });

        return $tag;

    }

}

export {Tag}