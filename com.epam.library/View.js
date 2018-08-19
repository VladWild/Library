function View(model, controller) {
    this.model = model;
    this.controller = controller;

    /*элементы*/


    this.init = function () {
        /*отправки наблюдателю подписанных элементов*/
        function subscription() {

        }
        /*добавление событий элементам*/
        function event() {

        }

        subscription();
        event();
    }
}

/*описание действий, происходящих в результате случившихся событий*/
View.prototype = {

};

