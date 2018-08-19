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

};

