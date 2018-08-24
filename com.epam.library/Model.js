function Model() {
    /*данные модели*/
    this.books = [];        //массив книг
    this.notices = [];      //массив уведомлений

    /*наблюдатели элементов*/
    this.onSearcher = new EventEmitter();               /*поиск*/
    this.onClickStar = new EventEmitter();              /*отпускание клика на звездочке*/
    this.onHighlightStars = new EventEmitter();         /*держание курсора на звездочках*/
    this.onShowCurrentStarsBook = new EventEmitter();   /*увод курсора со звездочек*/
    this.onShowClickStar = new EventEmitter();          /*задержка клика на звездочках*/
    this.onClickPopularBooks = new EventEmitter();      /*клик на популярные книги*/
    this.onClickAddBook = new EventEmitter();           /*клик на добавление книги*/
    this.onClickSaveBook = new EventEmitter();          /*клик на сохранение книги*/
    this.onClickImageBook = new EventEmitter();         /*клик на изображение книги*/
    this.onClickButtonSaveTags = new EventEmitter();    /*сохранение тегов книги*/
    this.onClickBestList = new EventEmitter();          /*клик на список лучших книг*/
    this.onClickClassicNovels = new EventEmitter();     /*клик на романы*/

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
        let oddStars = this.books[id].stars;
        this.books[id].stars = stars;
        if (oddStars !== stars){
            this.methods.updateTime(this.notices);
            this.notices.unshift(new Notice('You changed the book rating of "'
                + this.books[id].title + '" from '
                + oddStars + ' to ' + this.books[id].stars,
                new Date(), 0));
        }
        this.onClickStar.notify(id, stars, this.notices);
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
        this.methods.updateTime(this.notices);
        this.notices.unshift(new Notice('You click filter popular books',
            new Date(), 0));
        this.onClickPopularBooks.notify(popularBooks, this.notices);
    },
    addBook: function () {
        this.onClickAddBook.notify();
    },
    saveBook: function (title, author) {
        let id = String(this.books.length);
        let position = String(this.books.length);
        let image = 'resources/books/nocover.jpg';
        let stars = '0';
        let book = new Book(id, position, title, author, image, stars);
        this.books.push(book);
        this.methods.updateTime(this.notices);
        this.notices.unshift(new Notice('You added book "' + book.title +
            '" by ' + book.author, new Date(), 0));
        this.onClickSaveBook.notify(this.books, this.notices);
    },
    showModelWindowWithBook: function (id) {
        this.onClickImageBook.notify(this.books[id]);
    },
    saveTagsBook: function (id, best, novel) {
        this.books[id].setTags(best, novel);
        this.onClickButtonSaveTags.notify();
    },
    best: function (str) {
        let books = this.filters.search(this.books, str);
        let bestBooks = this.filters.best(books);
        this.methods.changePosition(bestBooks);
        this.methods.updateTime(this.notices);
        this.notices.unshift(new Notice('You click filter best of list books',
            new Date(), 0));
        this.onClickBestList.notify(bestBooks, this.notices);
    },
    novels: function (str) {
        let books = this.filters.search(this.books, str);
        let novelBooks = this.filters.novels(books);
        this.methods.changePosition(novelBooks);
        this.methods.updateTime(this.notices);
        this.notices.unshift(new Notice('You click classic novels books',
            new Date(), 0));
        this.onClickClassicNovels.notify(novelBooks, this.notices);
    }
};

/*фильтры*/
Model.prototype.filters = {
    search: function (arr, str) {
        return arr.filter(book => book.title.indexOf(str) > -1 ||
                book.author.indexOf(str) > -1);
    },
    popular: function (arr) {
        return arr.filter(book => +book.stars === 5);
    },
    best: function (arr) {
        return arr.filter(book => book.best);
    },
    novels: function (arr) {
        return arr.filter(book => book.novel);
    }
};

/*внутренние методы*/
Model.prototype.methods = {
    changePosition: function (books) {
        for (let i = 0; i < books.length; i++){
            books[i].position = i;
        }
    },
    updateTime: function (notices) {
        let now = new Date();
        for (let i = 0; i < notices.length; i++){
            notices[i].timeDifference = now.getTime() -
                notices[i].time;
        }
    }
};

