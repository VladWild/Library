function View(model, controller) {
    this.model = model;
    this.controller = controller;

    /*элементы*/
    this.searcher = document.getElementById('searcher');         //1) поисковой запрос - task1
    this.books = document.getElementById('books');               //2) окно с книгами: рейтинг для книг - task2
    this.allBooks = document.getElementById('all-books');        //3) все книги - task3
    this.popularBooks = document.getElementById('popular');      //3) популярные книги - task3

    this.init = function () {
        let that = this;
        /*отправки наблюдателям подписанных элементов*/
        function subscription() {
            that.model.onSearcher.subscribe(function (books) {
                that.showBooks(books);
            });
            that.model.onClickStar.subscribe(function (id, stars) {
                that.upDateStars(id, stars);
                that.highlightStars(id, stars);
            });
            that.model.onHighlightStars.subscribe(function (id, stars, currentStars) {
                that.highlightStars(id, stars, currentStars);
            });
            that.model.onShowCurrentStarsBook.subscribe(function (id, stars) {
                that.upDateStars(id, stars);
            });
            that.model.onShowClickStar.subscribe(function (id, stars) {
                that.showClickStar(id, stars);
            });
            that.model.onClickPopularBooks.subscribe(function (books) {
                that.showBooks(books);
            });
        }
        /*добавление событий элементам*/
        function event() {
            that.searcher.onkeyup = function(){
                if (that.allBooks.getAttribute('class') === 'bg shadow') {
                    that.controller.search(this.value);
                } else {
                    that.controller.popular(this.value);
                }
            };
            that.books.onclick = function (event) {
                let target = event.target;
                if (target.tagName === 'I') {
                    let stars = target.getAttribute('aria-valuetext');
                    let id = that.methods.getIdBookByTarget(target);
                    that.controller.upDateStars(id, stars);
                }
            };
            that.books.onmouseover = function (event) {
                let target = event.target;
                if (target.tagName === 'I'){
                    let stars = target.getAttribute('aria-valuetext');
                    let id = that.methods.getIdBookByTarget(target);
                    that.controller.highlightStars(id, stars);
                }
            };
            that.books.onmouseout = function (event) {
                let target = event.target;
                if (target.tagName === 'I'){
                    let id = that.methods.getIdBookByTarget(target);
                    that.controller.showCurrentStars(id);
                }
            };
            that.books.onmousedown = function (event) {
                let target = event.target;
                if (target.tagName === 'I'){
                    let stars = target.getAttribute('aria-valuetext');
                    let id = that.methods.getIdBookByTarget(target);
                    that.controller.showClickStar(id, stars);
                }
            };
            that.allBooks.onclick = function(){
                that.controller.search(that.searcher.value);
                that.showClickAllBooks();
            };
            that.popularBooks.onclick = function () {
                that.controller.popular(that.searcher.value);
                that.showClickPopularBooks();
            }
        }

        subscription();
        event();
    }
}

/*описание действий, происходящих в результате случившихся событий*/
View.prototype = {
    showBooks: function (books) {
        let booksHTML = document.getElementById("books");
        let inner = '';
        for (let i = 0; i < books.length; i++){
            inner += Tags.getBook(books[i].id,
                books[i].position,
                books[i].title.replace(this.searcher.value,
                    '<span>' + this.searcher.value + '</span>'),
                books[i].author.replace(this.searcher.value,
                    '<span>' + this.searcher.value + '</span>'),
                books[i].image,
                books[i].stars);
        }
        booksHTML.innerHTML = inner;
        let booksClass = booksHTML.getElementsByClassName('book');
        for (let i = 0; i < booksClass.length; i++){
            let stars = booksClass[i].getElementsByTagName('i');
            for (let j = 0; j < books[i].stars; j++){
                stars[j].setAttribute('class', 'fa fa-star');
            }
        }
    },
    upDateStars: function (id, stars) {
        let bookHTML = this.methods.getBookHtmlByID(id);
        let starsBook = bookHTML.getElementsByTagName('i');
        for (let i = 0; i < stars; i++){
            starsBook[i].setAttribute('class', 'fa fa-star');
            starsBook[i].setAttribute('style', '');
        }
        for (let i = stars; i < starsBook.length; i++){
            starsBook[i].setAttribute('class', 'fa fa-star-o');
            starsBook[i].setAttribute('style', '');
        }
    },
    highlightStars: function (id, stars, currentStars) {
        let bookHTML = this.methods.getBookHtmlByID(id);
        let starsBook = bookHTML.getElementsByTagName('i');
        for (let i = 0; i < stars; i++){
            starsBook[i].setAttribute('class', 'fa fa-star');
            starsBook[i].setAttribute('style', 'text-shadow:0px 0px 18px rgba(0,0,255,0.9); color: yellow');
        }
        if (stars < currentStars) {
            for (let i = stars; i < currentStars; i++){
                starsBook[i].setAttribute('class', 'fa fa-star');
                starsBook[i].setAttribute('style', 'text-shadow:0px 0px 18px rgba(0,0,255,0.9)');
            }
            for (let i = currentStars; i < starsBook.length; i++){
                starsBook[i].setAttribute('class', 'fa fa-star-o');
                starsBook[i].setAttribute('style', 'text-shadow:0px 0px 18px rgba(0,0,255,0.9)');
            }
        } else {
            for (let i = stars; i < starsBook.length; i++){
                starsBook[i].setAttribute('class', 'fa fa-star-o');
                starsBook[i].setAttribute('style', 'text-shadow:0px 0px 18px rgba(0,0,255,0.9)');
            }
        }
    },
    showClickStar: function (id, stars) {
        let bookHTML = this.methods.getBookHtmlByID(id);
        let starsBook = bookHTML.getElementsByTagName('i');
        starsBook[stars - 1].setAttribute('style', 'text-shadow:0px 0px 18px rgba(0,0,255,0.9); color: #FF5600');
    },
    showClickAllBooks: function () {
        this.popularBooks.setAttribute('class', 'shadow');
        this.allBooks.setAttribute('class', 'bg shadow');
    },
    showClickPopularBooks: function () {
        this.popularBooks.setAttribute('class', 'bg shadow');
        this.allBooks.setAttribute('class', 'shadow');
    }
};

/*внутренние методы*/
View.prototype.methods = {
    getBookHtmlByID: function (id) {
        return Array.from(document
            .getElementsByClassName('book'))
            .filter(bookHTML => bookHTML.getAttribute('aria-valuemax') === id)[0];
    },
    getIdBookByTarget: function (target) {
        return target.parentElement.parentElement
            .parentElement.parentElement
            .getAttribute('aria-valuemax');
    }
};

