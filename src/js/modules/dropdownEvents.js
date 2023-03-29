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

            // We use a little timeout otherwise it does not focus the element
            setTimeout(() => {
                $contenteditable.focus();
            }, 200);


        });

        $dropdown.addEventListener("hidden.bs.dropdown", event => {

            let $parent = $dropdown.closest(".col-lg-6");
            $parent.classList.remove("col-lg-6");
            $parent.classList.add("col-lg-2");

        });

    });

    /*let $contenteditables = document.querySelectorAll("#tag-btn-container [contenteditable]");

    $contenteditables.forEach( $contenteditable => {

        $contenteditable.addEventListener("click", event => {


        })

    });*/

}

export {init};