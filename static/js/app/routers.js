App.router.Main = App.Router.extend({

    routes: {
        "":                 "index",
        "topic/:topicId/": "topic"
    },


    index: function () {
    },

    topic: function (topicId) {
        var t = App.state.topics.collection.get(topicId);
        if (! t) {
            t = new App.model.Topic({id: topicId});
            t.fetch();
        }
        var posts = t.posts();
        var view = new App.view.Posts({
            model: t,
            collection: posts,
            el: $(App.init.options.el.middle)
        });
        posts.fetch();
        view.render();
    }

});
