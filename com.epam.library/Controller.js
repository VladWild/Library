function Controller() {
    this.model = new Model();
    this.view = new View(this.model, this);

    /*начальная инициализация модели и контроллера*/
    this.start = function () {
        this.view.init();
        this.model.init();
    }
}

/*реакция на событие после случившегося event'а - передача управления содержимым модели*/
Controller.prototype = {
    search: function (str) {
        this.model.search(str);
    },
    upDateStars: function (id, stars) {
        this.model.upDateStars(id, stars);
    },
    highlightStars: function (id, stars) {
        this.model.highlightStars(id, stars);
    },
    showCurrentStars: function (id) {
        this.model.currentStarsBookById(id);
    },
    showClickStar: function (id, stars) {
        this.model.showClickStar(id, stars);
    },
    popular: function (str) {
        this.model.popular(str);
    },
    addBook: function () {
        this.model.addBook();
    },
    saveBook: function (title, author) {
        this.model.saveBook(title, author);
    },
    showModelWindowWithBook: function (id) {
        this.model.showModelWindowWithBook(id);
    },
    setBookTags: function (id, best, novel) {
        this.model.saveTagsBook(id, best, novel);
    },
    best: function (str) {
        this.model.best(str);
    },
    novels: function (str) {
        this.model.novels(str);
    }
};

