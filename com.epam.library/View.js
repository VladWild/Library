function View(model, controller) {
    this.model = model;
    this.controller = controller;

    /*элементы*/
    this.searcher = document.getElementsByClassName('searcher')[0];     //1) поисковой запрос - task1
    this.stars = [];                                                    //2) рейтинг для книг
    this.stars = Array.prototype.concat.apply(this.stars, document.getElementsByClassName("fa fa-star"));
    this.stars = Array.prototype.concat.apply(this.stars, document.getElementsByClassName("fa fa-star-o"));

    this.init = function () {
        /*отправки наблюдателям подписанных элементов*/
        function subscription(that) {
            that.model.onSearcher.subscribe(function (books) {
                that.showBooks(books);
            });
            that.model.onClickStar.subscribe(function (idBook, rating) {
                that.upDateStars(idBook, rating);
            })
        }
        /*добавление событий элементам*/
        function event(that) {
            that.searcher.onkeyup = function(){
                that.controller.search(this.value);
            };
            Array.from(that.stars).forEach(stars =>
                stars.addEventListener('click', function () {
                    let number = stars.getAttribute('aria-valuetext');
                    let idBook = stars.parentElement.parentElement
                        .parentElement.parentElement.getAttribute('aria-valuetext');
                    that.controller.upDateRating(number, idBook);
                })
            );
        }

        subscription(this);
        event(this);
    }
}

/*описание действий, происходящих в результате случившихся событий*/
View.prototype = {
    showBooks: function (books) {
        let booksHTML = document.getElementById("books");
        let inner = '';
        for (let i = 0; i < books.length; i++){
            inner += Tags.getBook(i, books[i].title.replace(this.searcher.value,
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
        };
    },
    upDateStars: function (idBook, rating) {
        let book = document.getElementsByClassName('book')[idBook];
        let starsBook = book.getElementsByTagName('i');
        for (let i = 0; i < rating; i++){
            starsBook[i].setAttribute('class', 'fa fa-star');
        }
        for (let i = rating; i < starsBook.length; i++){
            starsBook[i].setAttribute('class', 'fa fa-star-o');
        }
    }
};

