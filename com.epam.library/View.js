function View(model, controller) {
    this.model = model;
    this.controller = controller;

    /*элементы*/
    this.searcher = document.getElementsByClassName('searcher')[0];     //1) поисковой запрос - task1

    this.init = function () {
        /*отправки наблюдателю подписанных элементов*/
        function subscription(that) {
            that.model.onSearcher.subscribe(function (books) {
                that.showBooks(books);
            })
        }
        /*добавление событий элементам*/
        function event(that) {
            that.searcher.onkeyup = function(){
                that.controller.search(this.value);
            };
        }

        subscription(this);
        event(this);
    }
}

/*описание действий, происходящих в результате случившихся событий*/
View.prototype = {
    showBooks: function (books) {
        /*тут типа сделать так, чтобы вывести только пришедший массив книг*/
        let booksHTML = document.getElementById("books");
        let inner = '';
        for (let i = 0; i < books.length; i++){
            inner += Tags.getBook(books[i].title.replace(this.searcher.value,
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
    }
};

