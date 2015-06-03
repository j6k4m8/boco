Template.home.created = function() {
    if (!!this.data && this.data.plot_uuid) {
        Session.set('waitingForPlotData', true);
        Meteor.call('getPlot', this.data.plot_uuid, function(err, val) {
            if (!err) {
                Session.set('page_plot', val)
                // Session.set('waitingForPlotData', false);
            }
        });
    }
};


Template.home.rendered = function() {
    PlotOptions =  {
        scale: 1,
        margins: {
            "left": 40,
            "right": 30,
            "top": 30,
            "bottom": 30
        }
    };
    if (Session.get('waitingForPlotData') == true) {
        $('#scatter-load').html('<b>Loading...</b>');
        Meteor.setTimeout(function() {
            spreadsheet = $("#spreadsheet").handsontable({
                data: Session.get('page_plot').data,
                manualColumnResize: true,
                rowHeaders: true,
                colHeaders: true,
                minSpareRows: 1,
                stretchH: 'all'
            });
            PlotOptions = Session.get('page_plot').plotOptions;
            $('#scatter-load').html('<b>Ready!</b>');
            $('.js-render-trigger').click();
        }, 3000);
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
