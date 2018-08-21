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
    }
};

