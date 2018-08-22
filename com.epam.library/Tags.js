class Tags {
    static getBook(id, position, title, author, image, stars) {
        return '<div aria-valuemax="' + id + '" aria-valuenow="' + position + '" class="book">\n' +
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

    static getAddBook(){
        return '<button id="add-book">\n' +
                    '<i class="fa fa-plus" aria-hidden="true"></i>\n' +
                    '<span>ADD A BOOK</span>\n' +
                '</button>';
    }

    

    static getModelWindowWithBook(){
        return '<div id="form">\n' +
                    '<div id="transparency"></div>\n' +
                    '<div id="form-book">\n' +
                        '<img src="resources/books/InexpensiveFamilyMeals.jpg" alt="">\n' +
                        '<div class="info-book">\n' +
                            '<div class="name-book">\n' +
                                '<span>Cakes & Bakes</span>\n' +
                            '</div>\n' +
                            '<div class="author">\n' +
                                '<span>Sanjeev Kapoor</span>\n' +
                            '</div>\n' +
                            '<div class="stars">\n' +
                                '<ul>\n' +
                                    '<li><i class="fa fa-star" aria-valuetext="1" aria-hidden="true"></i></li>\n' +
                                    '<li><i class="fa fa-star" aria-valuetext="2" aria-hidden="true"></i></li>\n' +
                                    '<li><i class="fa fa-star" aria-valuetext="3" aria-hidden="true"></i></li>\n' +
                                    '<li><i class="fa fa-star" aria-valuetext="4" aria-hidden="true"></i></li>\n' +
                                    '<li><i class="fa fa-star-o" aria-valuetext="5" aria-hidden="true"></i></li>\n' +
                                '</ul>\n' +
                            '</div>\n' +
                        '</div>\n' +
                        '<div class="checkboxes">\n' +
                            '<input type="checkbox" id="best-of-list" name="feature" value="best" />\n' +
                            '<label for="best">Best of list</label>\n' +
                            '<input type="checkbox" id="classic-novels" name="feature" value="novels" />\n' +
                            '<label for="novels">Classic novels</label>\n' +
                        '</div>\n' +
                    '<button id="ok">\n' +
                        'Ok\n' +
                    '</button>\n' +
                '</div>\n' +
            '</div>';


    }
}