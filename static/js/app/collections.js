"use strict";

App.collection.Topics = App.Collection.extend({

    model: App.model.Topic,

    url: function () {
        return App.api.urlRoot + 'topic?format=json';
    }

});
