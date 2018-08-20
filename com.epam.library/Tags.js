class Tags {
    static getBook(id, title, author, image, stars) {
        return '<div aria-valuetext=' + id + ' class="book">\n' +
            '                    <img src=' + image + ' alt="">\n' +
            '                    <div class="name-book">\n' +
            '                        <span>' + title + '</span>\n' +
            '                    </div>\n' +
            '                    <div class="author">\n' +
            '                        <span class="by">by</span>\n' +
            '                        <span class="name">' + author + '</span>\n' +
            '                    </div>\n' +
            '                    <div class="stars">\n' +
            '                        <ul>\n' +
            '                            <li><i class="fa fa-star-o" aria-valuetext="1" aria-hidden="true"></i></li>\n' +
            '                            <li><i class="fa fa-star-o" aria-valuetext="2" aria-hidden="true"></i></li>\n' +
            '                            <li><i class="fa fa-star-o" aria-valuetext="3" aria-hidden="true"></i></li>\n' +
            '                            <li><i class="fa fa-star-o" aria-valuetext="4" aria-hidden="true"></i></li>\n' +
            '                            <li><i class="fa fa-star-o" aria-valuetext="5" aria-hidden="true"></i></li>\n' +
            '                        </ul>\n' +
            '                    </div>\n' +
            '                </div>';
    }
}