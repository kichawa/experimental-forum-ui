"use strict";


App.view.Topics = App.View.extend({

    className: 'topics',

    template: App.template('topics'),

    initialize: function () {
        _.bindAll(this, 'addOne');
        this.collection.bind('reset', this.addAll, this);
        this.collection.bind('add', this.addOne, this);
        this.collection.bind('reset:start', this.loadingDataStart, this);
        this.collection.bind('reset:end', this.loadingDataEnd, this);

        this.enableInfiniteScroll();
    },

    addAll: function () {
        this.collection.each(this.addOne);
    },

    addOne: function (m) {
        var v = new App.view.Topic({model: m});
        this.$el.find('ul:first').append(v.render().el);
    },

    loadingDataStart: function () {
        if (this._loadingData) {
            return;
        }
        this._loadingData = true;
        this.$el.append('<li class="loading-data">loading data</li>');
    },

    loadingDataEnd: function () {
        this.$el.find('.loading-data').remove();
        delete this._loadingData;
    },

    enableInfiniteScroll: function () {
        var that = this;

        this.$el.on('scroll', function () {
            var pos = $(this).scrollTop() / ($(this).find('.scrollbox').height() - $(window).height());
            if (pos > 0.8) {
                App.state.topics.collection.fetchMore();
            }
        });
    }

});


App.view.Topic = App.View.extend({

    tagName: 'ul',

    className: 'topic',

    template: App.template('topic'),

    events: {
        'click': 'topicDetails'
    },

    initialize: function () {
        _.bindAll(this, 'topicDetails');
        this.model.bind('change:active', this.render, this);
    },

    topicDetails: function (e) {
        e ? e.preventDefault() : null;
        var uri = "topic/" + this.model.id + '/';
        App.routerInstance.Main.navigate(uri, {trigger: true});
    },

    render: function () {
        this.$el.toggleClass('active', !!this.model.get('active'));
        return App.View.prototype.render.call(this);
    }

});


App.view.Posts = App.View.extend({

    className: 'posts',

    template: App.template('posts'),

    initialize: function () {
        _.bindAll(this, 'addOne');
        this.model.bind('all', this.render, this);
        this.collection.bind('reset', this.addAll, this);
        this.addAll();
    },

    addAll: function () {
        this.collection.each(this.addOne);
    },

    addOne: function (m) {
        var v = new App.view.Post({model: m});
        this.$el.find('.posts-list').append(v.render().el);
    }
    
});


App.view.Post = App.View.extend({

    className: 'post-item',

    template: App.template('post')

});
