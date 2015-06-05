Template.settingsPane.events({
    'change #plotScale': function() {
        PlotOptions.scale = Math.log($('#plotScale').val()) / 4;
        $('#scatter-load').html('');
        showScatterPlot(hotParseToJSON());
    },

    'click .js-clear-trigger': function() {
        spreadsheet.data().handsontable.clear();
    },

    'click .js-demo-trigger': function() {
        spreadsheet = $("#spreadsheet").handsontable({
            data: data100,
            manualColumnResize: true,
            rowHeaders: true,
            colHeaders: true,
            minSpareRows: 1,
            stretchH: 'all'
        });
    },

    'click .js-link-trigger': function() {
        var _data = spreadsheet.data().handsontable.getData();
        var _plotOptions = PlotOptions;

        Meteor.call('getNewLink', {
            data: _data,
            plotOptions: _plotOptions
        }, function(err, val) {
            if (!err) {
                prompt('Use this link to navigate directly back to this graph.', 'http://boco.jordan.matelsky.com/plots/' + val);
            }
        });
    },

    'click .js-label-trigger': function() {
        PlotOptions.labels.static.show = !PlotOptions.labels.static.show;
        showScatterPlot(hotParseToJSON());
    }
});


Template.settingsPane.helpers({
    willExpire: function() {
        return !!Session.get('page_plot')
    },

    plot_date: function() {
        return moment(Session.get('page_plot').created).format('LLLL')
    },

    plot_expiry: function() {
        return moment(Session.get('page_plot').created).add(2, 'w').calendar()
    }
});
