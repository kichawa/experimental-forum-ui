"use strict";

window.App = window.App || {
    model: {},
    collection: {},
    view: {},
    router: {},
    routerInstance: {}
};

App.api = {
    urlRoot: 'http://' + document.location.host + '/api/v1/'
};

App.Model = Backbone.Model.extend({

    fetch: function (o) {
        o = o || {};
        var that = this;
        var success = o.success || $.noop;;
        var error = o.error || $.noop;

        o.success = function (c, r) {
            that.trigger('reset:success');
            that.trigger('reset:end');
            return success(c, r);
        };

        o.error = function (c, r) {
            that.trigger('reset:error');
            that.trigger('reset:end');
            return error(c, r);
        };

        this.trigger('reset:begin');
        return Backbone.Model.prototype.fetch.call(this, o);
    }

});

App.Collection = Backbone.Collection.extend({

    parse: function (o) {
        return o.objects;
    },

    fetch: function (o) {
        o = o || {};
        var that = this;
        var success = o.success || $.noop;;
        var error = o.error || $.noop;

        o.success = function (c, r) {
            that.trigger('reset:success');
            that.trigger('reset:end');
            return success(c, r);
        };

        o.error = function (c, r) {
            that.trigger('reset:error');
            that.trigger('reset:end');
            return error(c, r);
        };

        this.trigger('reset:begin');
        return Backbone.Collection.prototype.fetch.call(this, o);
    }

});

App.View = Backbone.View.extend({

    render: function (ctx) {
        ctx = ctx || {};
        var context = {
            model: this.model ? this.model.toJSON() : {},
            collection: this.collection ? this.collection.toJSON() : {},
            view: this,
        };
        _.extend(context, ctx);
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
    return Date.prototype.format.call(dt, dt, format);
});
