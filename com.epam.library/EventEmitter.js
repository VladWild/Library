function EventEmitter() {
    this.listeners = [];
}

EventEmitter.prototype = {
    subscribe: function (handler) {
        this.listeners.push(handler);
    },
    notify: function (data, data2, data3) {
        for (let i = 0; i < this.listeners.length; i++){
            this.listeners[i](data, data2, data3);
        }
    }
};

