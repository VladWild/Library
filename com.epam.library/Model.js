function Model() {
    /*данные модели*/
    this.books = [];

    /*наблюдатели элементов*/
    this.onSearcher = new EventEmitter();               /*поиск*/
    this.onClickStar = new EventEmitter();              /*отпускание клика на звездочке*/
    this.onHighlightStars = new EventEmitter();         /*держание курсора на звездочках*/
    this.onShowCurrentStarsBook = new EventEmitter();   /*увод курсора со звездочек*/
    this.onShowClickStar = new EventEmitter();          /*задержка клика на звездочках*/
    this.onClickPopularBooks = new EventEmitter();      /*клик на популярные книги*/

    this.init = function () {
        let that = this;
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
        let books = this.filters.search(this.books, str);
        this.methods.changePosition(books);
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
    },
    popular: function (str) {
        let books = this.filters.search(this.books, str);
        let popularBooks = this.filters.popular(books);
        this.methods.changePosition(popularBooks);
        this.onClickPopularBooks.notify(popularBooks);
    }
};

/*фильтры*/
Model.prototype.filters = {
    search: function (arr, str) {
        return arr.filter(book => book.title.indexOf(str) > -1 ||
                book.author.indexOf(str) > -1);
    },
    popular: function (arr) {
        return arr.filter(book => book.stars == 5);
    }
};

/*внутренние методы*/
Model.prototype.methods = {
    changePosition: function (books) {
        for (let i = 0; i < books.length; i++){
            books[i].position = i;
        }
    }
};

