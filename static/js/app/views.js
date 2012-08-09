"use strict";


App.view.Topics = App.View.extend({

    className: 'topics',

    template: App.template('topics'),

    initialize: function () {
        _.bindAll(this, 'addOne');
        this.collection.bind('reset', this.addAll, this);
    },

    addAll: function () {
        this.collection.each(this.addOne);
    },

    addOne: function (m) {
        var v = new App.view.Topic({model: m});
        this.$el.find('ul:first').append(v.render().el);
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
    },

    topicDetails: function (e) {
        e ? e.preventDefault() : null;
        var uri = "topic/" + this.model.id + '/';
        App.routerInstance.Main.navigate(uri, {trigger: true});
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
