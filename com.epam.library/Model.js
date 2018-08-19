function Model() {
    this.books = [];

    this.init = function () {
        /*инициализация массива книг со страницы*/
        function initBooks(that) {
            let bookHtml = document.getElementsByClassName("book");
            for (let i = 0; i < bookHtml.length; i++){
                let title = bookHtml[i]
                    .getElementsByClassName('name-book')[0]
                    .getElementsByTagName('span')[0]
                    .textContent;
                let author = bookHtml[i]
                    .getElementsByClassName('author')[0]
                    .getElementsByClassName('name')[0]
                    .textContent;
                let image = bookHtml[i]
                    .firstElementChild
                    .getAttribute('src');
                let stars = bookHtml[i]
                    .getElementsByClassName('fa fa-star')
                    .length;
                that.books[i] = new Book(title, author, image, stars);
            }
        }

        initBooks(this);
    }
}

/*обработка данных в модели и проход по всем слушателям (изменяющимся элементам на странице) этими данными*/
Model.prototype = {

};

