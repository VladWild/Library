class Tags {
    static getBook(title, author, image, stars) {
        return '<div class="book">\n' +
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
            '                            <li><i class="fa fa-star-o" aria-hidden="true"></i></li>\n' +
            '                            <li><i class="fa fa-star-o" aria-hidden="true"></i></li>\n' +
            '                            <li><i class="fa fa-star-o" aria-hidden="true"></i></li>\n' +
            '                            <li><i class="fa fa-star-o" aria-hidden="true"></i></li>\n' +
            '                            <li><i class="fa fa-star-o" aria-hidden="true"></i></li>\n' +
            '                        </ul>\n' +
            '                    </div>\n' +
            '                </div>';
    }
}