function Model() {
    /*данные модели*/
    this.books = [];

    /*наблюдатели элементов*/
    this.onSearcher = new EventEmitter();
    this.onClickStar = new EventEmitter();
    this.onHighlightStars = new EventEmitter();
    this.onShowCurrentStarsBook = new EventEmitter();
    this.onShowClickStar = new EventEmitter();

    this.init = function () {
        var that = this;
        /*инициализация массива книг со страницы*/
        function initBooks() {
            let bookHtml = document.getElementsByClassName("book");
            for (let i = 0; i < bookHtml.length; i++){
                let id = bookHtml[i].getAttribute('aria-valuemax');
                let position = bookHtml[i].getAttribute('aria-valuenow');
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
                that.books[i] = new Book(id, position, title, author, image, stars);
            }
        }

        initBooks();
    }
}

/*обработка данных в модели и проход по всем слушателям (изменяющимся элементам на странице) этими данными*/
Model.prototype = {
    search: function (str) {
        let books = this.books
            .filter(book => book.title.indexOf(str) > -1 ||
            book.author.indexOf(str) > -1);
        for (let i = 0; i < books.length; i++){
            books[i].position = i;
        }
        this.onSearcher.notify(books);
    },
    upDateStars: function (id, stars) {
        this.books[id].stars = stars;
        this.onClickStar.notify(id, stars);
    },
    highlightStars: function (id, stars) {
        let currentStars = this.books
            .filter(book => book.id === id)
            .map(book => book.stars)[0];
        console.log(currentStars);
        this.onHighlightStars.notify(id, stars, currentStars);
    },
    currentStarsBookById: function (id) {
        let stars = this.books
            .filter(book => book.id === id)[0]
            .stars;
        this.onShowCurrentStarsBook.notify(id, stars);
    },
    showClickStar: function (id, stars) {
        this.onShowClickStar.notify(id, stars);
    }
};

