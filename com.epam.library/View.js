function View(model, controller) {
    this.model = model;
    this.controller = controller;

    /*элементы*/
    this.searcher = document.getElementById('searcher');         //1) поисковой запрос - task1
    this.books = document.getElementById('books');               //2) окно с книгами: рейтинг для книг - task2

    this.init = function () {
        let that = this;
        /*отправки наблюдателям подписанных элементов*/
        function subscription() {
            that.model.onSearcher.subscribe(function (books) {
                that.showBooks(books);
            });
            that.model.onClickStar.subscribe(function (id, stars) {
                that.upDateStars(id, stars);
            })
        }
        /*добавление событий элементам*/
        function event() {
            that.searcher.onkeyup = function(){
                that.controller.search(this.value);
            };
            that.books.onclick = function (event) {
                let target = event.target;
                if (target.tagName === 'I') {
                    let stars = target.getAttribute('aria-valuetext');
                    let id = target.parentElement.parentElement
                        .parentElement.parentElement.getAttribute('aria-valuemax');
                    that.controller.upDateStars(id, stars);
                }
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
        };
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
        let booksHTML = document.getElementsByClassName('book');
        let bookHTML = Array.from(booksHTML)
            .filter(bookHTML => bookHTML.getAttribute('aria-valuemax') === id)[0];
        let starsBook = bookHTML.getElementsByTagName('i');
        for (let i = 0; i < stars; i++){
            starsBook[i].setAttribute('class', 'fa fa-star');
        }
        for (let i = stars; i < starsBook.length; i++){
            starsBook[i].setAttribute('class', 'fa fa-star-o');
        }
    }
};

