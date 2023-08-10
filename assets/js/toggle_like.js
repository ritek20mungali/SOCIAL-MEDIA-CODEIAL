//change:create a class to toggle likes hwen a link is clicked usin gajax

// const { $where } = require("../../models/like");
class ToggleLike {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike() {
        $(this.toggler).click(function(e) {
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));  // Corrected this line
                console.log(likesCount);
                if (data.data.deleted === true) {
                    likesCount -= 1;
                } else {
                    likesCount += 1;
                }

                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);
            })
            .fail(function(err) {
                console.log('Error in completing the request');
            });
        });
    }
}
