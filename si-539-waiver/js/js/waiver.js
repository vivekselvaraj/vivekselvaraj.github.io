window.onload = function () {
    // Problem 1
    const figures = document.getElementsByTagName("figure");
    for (const figure of figures) {
        figure.classList.add("one-third");
    }

    // Problem 2
    const footer = document.getElementsByTagName("footer")[0];
    footer.addEventListener("click", () => {
        footer.style.display = "none";
    })

    // Problem 3
    const figure = figures[4];
    figure.addEventListener("dblclick", () => {
        figure.style.visibility = "hidden";
    })

    // Problem 4
    const figcaption = document.getElementsByTagName("figcaption")[0];
    const initFontFamily = figcaption.style.fontFamily;
    console.log(initFontFamily);
    function changeToCursive() {
        figcaption.style.fontFamily = "cursive";
    }
    function resetFontFamily() {
        figcaption.style.fontFamily = initFontFamily;
    }
    figcaption.addEventListener("mouseenter", changeToCursive);
    figcaption.addEventListener("mouseleave", resetFontFamily);

    // Problem 5
    document.onkeyup = function (event) {
        event.preventDefault();
        let key = event.key;
        if (key === "Tab") {
            if (figcaption.style.fontFamily === "cursive")
                resetFontFamily();
            else
                changeToCursive();
        }
    }
}