"use strict";

App.model.Topic = App.Model.extend({

    url: function () {
        return App.api.urlRoot + 'topic/' + this.id + '/?format=json';
    },

    posts: function () {
        var posts = new App.collection.Posts();
        posts.topic = this;
        return posts;
    },

    parse: function (raw) {
        raw.created = new Date(raw.created);
        return raw;
    }

});


App.model.Post = App.Model.extend({

    url: function () {
        return App.api.urlRoot + 'post/' + this.id + '/?format=json';
    }

});
