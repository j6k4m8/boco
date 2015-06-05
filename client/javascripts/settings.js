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

    'click .js-export-trigger': function() {
        var html = d3.select("svg")
                .attr("version", 1.1)
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .node().parentNode.innerHTML;

          //console.log(html);
          var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
          var img = '<img src="'+imgsrc+'">';
          d3.select("#export-img").html(img);


          var canvas = document.querySelector("canvas"),
              context = canvas.getContext("2d");

          var image = new Image;
          image.src = imgsrc;
          image.onload = function() {
              context.drawImage(image, 0, 0);

              var canvasdata = canvas.toDataURL("image/png");

              var pngimg = '<img src="'+canvasdata+'">';
              d3.select("#pngdataurl").html(pngimg);

              var a = document.createElement("a");
              a.download = "sample.png";
              a.href = canvasdata;
              a.click();
          };
    },

    'click .js-label-trigger': function() {
        PlotOptions.labels.static.show = !PlotOptions.labels.static.show;
        showScatterPlot(hotParseToJSON());
    },

    'keyup #plot_title': function(ev) {
        PlotOptions.plot_title = $(ev.target).val();
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
    },

    plotTitle: function() {
        return PlotOptions.plotTitle
    }
});
