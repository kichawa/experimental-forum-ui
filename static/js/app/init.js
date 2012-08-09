"use strict";

window.App = window.App || {
    model: {},
    collection: {},
    view: {},
    router: {},
    routerInstance: {}
};

App.api = {
    urlRoot: 'http://localhost:8080/api/'
};

App.Model = Backbone.Model.extend({
});

App.Collection = Backbone.Collection.extend({

    parse: function (o) {
        return o.objects;
    }

});

App.View = Backbone.View.extend({

    render: function () {
        var context = {
            model: this.model ? this.model.toJSON() : {},
            collection: this.collection ? this.collection.toJSON() : {},
            view: this,
        };
        this.$el.html(this.template(context));
        return this;
    }

});

App.Router = Backbone.Router.extend({
});


App.template = function (name) {
    var t;

    return function (context) {
        if (!t) {
            var $el = $('#template-' + name);
            if ($el.length !== 1) {
                throw "Template not found: " + name;
            }
            t = Handlebars.compile($el.html());
        }
        return t(context);
    }
};


App.init = function (options) {
    App.init.options = options;
    App.history = Backbone.history = new Backbone.History();


    App.state = {};
    var c = new App.collection.Topics();
    App.state.topics = {
        view: (new App.view.Topics({collection: c})),
        collection: c
    };
    $(options.el.left).append(App.state.topics.view.render().el),
    c.fetch();


    $(options.el.middle).css({
        width: $(document).width() - $(options.el.left).width() - 16
    });

    _.each(App.router, function (r, name) {
        App.routerInstance[name] = new r();
    });

    App.history.start(); //{pushState: true});
}


Handlebars.registerHelper('safe', function(text) {
    return new Handlebars.SafeString(text);
});

Handlebars.registerHelper('json', function(o) {
    try {
        return JSON.stringify(o);
    } catch (e) {
        return "(ERROR: cannot convert to json: " + e + ")";
    }
});

Handlebars.registerHelper('date', function(dt, format) {
    if (! _.isString(format)) {
        format = "fullDate";
    }
    return Date.prototype.format.call(dt, format);
});
