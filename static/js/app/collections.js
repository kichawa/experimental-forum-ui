"use strict";

App.collection.Topics = App.Collection.extend({

    model: App.model.Topic,

    url: function () {
        return App.api.urlRoot + 'topic?format=json';
    },

    initialize: function () {
        this.bind('change:active', this.onlyOneActive, this);
    },

    onlyOneActive: function (a) {
        if (this._onlyOneActiveProcessing) {
            return;
        }
        this._onlyOneActiveProcessing = true;
        this.each(function (m) {
            if (m.id != a.id && m.get('active')) {
                m.unset('active');
            }
        });
        delete this._onlyOneActiveProcessing;
    },

    parse: function (r) {
        this.meta = r.meta;
        return r.objects;
    },

    fetchMore: function () {
        if (this._isFetching) {
            return;
        }
        this._isFetching = true;

        var that = this;
        var url = this.url();
        if (this.meta && this.meta.next) {
            url = this.meta.next;
        }
        this.fetch({
            url: url,
            add: true,
            success: function () { delete that._isFetching; },
            error: function () { delete that._isFetching; }
        });
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
