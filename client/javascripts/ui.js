Template.home.rendered = function() {
    spreadsheet = $("#spreadsheet").handsontable({
        data: data100,
        manualColumnResize: true,
        rowHeaders: true,
        colHeaders: true,
        minSpareRows: 1,
        stretchH: 'all',

        // afterChange: function() {
        //     $('#scatter-load').html('');
        //     showScatterPlot(hotParseToJSON());
        // }
    });

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
