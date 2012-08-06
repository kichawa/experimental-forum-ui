App.state = {};

App.router.Main = App.Router.extend({

    routes: {
        "":                 "index",
        "/":                 "index"
    },


    topics: function () {
        var c = App.state.topics;
        if (!c) {
            c = new App.collection.Topics();
            App.state.topicsView = new App.view.Topics({
                el: $(App.init.options.el.left),
                collection: c
            });
            App.state.topicsView.render();
        }

        return c;
    },

    index: function () {
        this.topics().fetch();
    }

});
