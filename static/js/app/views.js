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
        console.log(this.model.get('resource_uri'));
    }


});



