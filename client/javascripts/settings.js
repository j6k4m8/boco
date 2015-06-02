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
    }
});
