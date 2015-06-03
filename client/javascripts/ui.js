Template.home.created = function() {
    if (!!this.data.plot_uuid) {
        Session.set('waitingForPlotData', true);
        Meteor.call('getPlot', this.data.plot_uuid, function(err, val) {
            if (!err) {
                Session.set('page_plot', val)
                Session.set('waitingForPlotData', false);
            }
        });
    }
};


Template.home.rendered = function() {
    if (Session.get('waitingForPlotData') == true) {
        Meteor.setTimeout(function() {
            spreadsheet = $("#spreadsheet").handsontable({
                data: Session.get('page_plot').data,
                manualColumnResize: true,
                rowHeaders: true,
                colHeaders: true,
                minSpareRows: 1,
                stretchH: 'all'
            });
        }, 1000);
    } else {
        spreadsheet = $("#spreadsheet").handsontable({
            data: data100,
            manualColumnResize: true,
            rowHeaders: true,
            colHeaders: true,
            minSpareRows: 1,
            stretchH: 'all'
        });
    }

    $('.js-hot-toggle').click(function() {
        $('.hot-pane').toggleClass('hidden');
        $('.hide-pane').fadeToggle();
    });

    $('.js-render-trigger').click(function() {
        $('#scatter-load').html('');
        showScatterPlot(hotParseToJSON());
    });

    $('#scatter-load').click(function() {
        $('.pane').addClass('hidden');
    });

    $('.hide-pane').click(function() {
        $('.hot-pane').toggleClass('hidden');
        $('.hide-pane').fadeToggle();
    });
};
