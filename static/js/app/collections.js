"use strict";

App.collection.Topics = App.Collection.extend({

    model: App.model.Topic,

    url: function () {
        return App.api.urlRoot + 'topic?format=json';
    }

});


App.collection.Posts = App.Collection.extend({

    model: App.model.Post,

    url: function () {
        var uri = App.api.urlRoot + 'post?format=json';
        if (this.topic) {
            uri += '&topic=' + this.topic.id;
        }
        return uri;
    }

});
