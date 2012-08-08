App.state = {};

App.router.Main = App.Router.extend({

    routes: {
        "":                 "index",
        "topic/:topicId/": "topic"
    },


    topics: function () {
        var c = App.state.topics;
        if (!c) {
            c = new App.collection.Topics();
            App.state.topicsView = new App.view.Topics({
                collection: c
            });
            $(App.init.options.el.left).append(App.state.topicsView.el),
            App.state.topicsView.render();
        }

        return c;
    },

    topicsPrepare: function () {
        if (!App.state.topic) {
            this.topics().fetch();
        } else {
            this.topics();
        }
    },

    index: function () {
        this.topicsPrepare()
    },

    topic: function (topicId) {
        this.topicsPrepare()
        var t = new App.model.Topic
    }

});
