Meteor.methods({
    'getNewLink': function(opts) {
        var uuid = Meteor.uuid();
        PlotURLs.insert({
            data: opts.data,
            plotOptions: opts.plotOptions,
            created: new Date(),
            url: uuid
        });
        return uuid;
    },

    'getPlot': function(uuid) {
        return PlotURLs.findOne({
            url: uuid
        });
    }
});
