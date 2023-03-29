function init() {


    // Get all dropdowns
    let $dropdowns = document.querySelectorAll("#tag-btn-container [data-bs-toggle=\"dropdown\"]");

    // Grow or shrink element when opened or closed
    $dropdowns.forEach( $dropdown => {

        $dropdown.addEventListener("show.bs.dropdown", event => {

            let $parent = $dropdown.closest(".col-lg-2");
            $parent.classList.remove("col-lg-2");
            $parent.classList.add("col-lg-6");

            let $contenteditable = $dropdown.querySelector("span");
            $contenteditable.setAttribute("contenteditable", "");
            $contenteditable.textContent = "";

            // We use a little timeout otherwise it does not focus the element
            setTimeout(() => {
                $contenteditable.focus();
            }, 100);


        });

        $dropdown.addEventListener("hidden.bs.dropdown", event => {

            let $parent = $dropdown.closest(".col-lg-6");
            $parent.classList.remove("col-lg-6");
            $parent.classList.add("col-lg-2");

            let $contenteditable = $dropdown.querySelector("span");
            $contenteditable.removeAttribute("contenteditable");
            $contenteditable.textContent = $contenteditable.getAttribute("data-initial-text");

        });

    });

    let $contenteditables = document.querySelectorAll("#tag-btn-container [data-placeholder]");

    $contenteditables.forEach( $contenteditable => {
        $contenteditable.setAttribute("data-initial-text", $contenteditable.textContent);

        // We prevent line break in content
        $contenteditable.addEventListener("keydown", e => {

            if(e.keyCode === 13)
            {
                e.preventDefault();
            }

        });
    });

}

export {init};