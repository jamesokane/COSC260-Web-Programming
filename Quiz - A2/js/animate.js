// jQuery onLoad function
$(function () {
    // run the updateImage function every 5000 ms
    setInterval("updateImage()", 5000);
});

// Loops through the available images craeting a Slideshow
function updateImage() {
    // select the image which is not hidden
    var $active = $('#img_animation :not(.hidden)');

    // select the next image
    var $next = $active.next();

    // loop the images, so when 'next' is called on the last image it
    // selects the first image again
    if ($next.length === 0) {
        $next = $('#img_animation img:first');
    }

    // Fade out the curent image, and add the 'hidden' class
    $active.fadeOut(1000, function () {
        $active.addClass('hidden')
        //Fade in next image and remove the 'hidden' class
        $next.fadeIn(1000, function () {
            $next.removeClass('hidden')
        });
    });

}
