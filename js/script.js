let wrappers = document.getElementsByClassName('project-img-wrapper');

    for (let i = 0; i < wrappers.length; i++) {
        // add event listener for mouseenter on wrapper
        wrappers[i].addEventListener('mouseenter', function() {
            var firstImage = this.getElementsByClassName('hover-opacity')[0];
            if (firstImage) {
                firstImage.style.opacity = 0.95;
            }
        });

        // add event listener for mouseleave on wrapper
        wrappers[i].addEventListener('mouseleave', function() {
            var firstImage = this.getElementsByClassName('hover-opacity')[0];
            if (firstImage) {
                firstImage.style.opacity = 0.7;
            }
        });
    }