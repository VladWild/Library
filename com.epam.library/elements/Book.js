function Book(id, position, title, author, image, stars) {
    this.id = id;
    this.position = position;
    this.title = title;
    this.author = author;
    this.image = image;
    this.stars = stars;

    this.best = false;
    this.novel = false;
}

Book.prototype = {
    setTags: function (best, novel) {
        this.best = best;
        this.novel = novel;
    }
};

