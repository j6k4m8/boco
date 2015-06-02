
hotParseToJSON = function() {
    // get HOT data
    var hotData = spreadsheet.data().handsontable.getData();
    var json = [], rowNumber = 0;
    _(hotData).each(function(row) {
        json.push({
            RPC: row[0],
            name: row[1],
            department: row[2],
            number: row[3],
            cost: row[4],
            product: row[5]
        });
    });
    return json;
}


PlotOptions = {
    scale: 1,
    margins: {
        "left": 40,
        "right": 30,
        "top": 30,
        "bottom": 30
    }
}

showScatterPlot = function(data) {

    var width = 1000;
    var height = 600;

    var colors = d3.scale.category10();

    var svg = d3.select("#scatter-load").append("svg").attr("width", width).attr("height", height).append("g")
        .attr("transform", "translate(" + PlotOptions.margins.left + "," + PlotOptions.margins.top + ")");

    var x = d3.scale.log()
        .domain(d3.extent(data, function (d) {
            return parseInt(d.cost);
        }))
        .range([0, width - PlotOptions.margins.left - PlotOptions.margins.right]);

    var y = d3.scale.log()
        .domain(d3.extent(data, function(d) { return parseInt(d.number); }))
        .range([height - PlotOptions.margins.top - PlotOptions.margins.bottom, 0]);

    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
    svg.append("g").attr("class", "y axis");

    svg.append("text")
        .attr("fill", "#414241")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height - 35)
        .text("Cost");

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(20, ",.1s")
        .tickSize(6, 0);
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(20, ",.1s").tickSize(6, 0);

    svg.selectAll("g.y.axis").call(yAxis);
    svg.selectAll("g.x.axis").call(xAxis);

    var datum = svg.selectAll("g.node").data(data, function (d) {
        return d.cost;
    });

    var datumGroup = datum.enter().append("g").attr("class", "node")
        .attr('transform', function (d) {
            if (!d || !d.cost || !d.number) { return; }
            return "translate(" + x(parseInt(d.cost)) + "," + y(parseInt(d.number)) + ")";
        });

    datumGroup.append("circle")
        .attr("r", function(d) { return Math.pow(parseInt(d.product), 0.2 * PlotOptions.scale)})
        .attr("class", "dot")
        .attr("opacity", function(d) {return 0.2})
        .style("fill", function (d) {
                return colors(d.department);
        })
        .on('mouseover', function(d){
            var nodeSelection = d3.select(this).style({opacity:'0.9'});
        })
        .on('mouseout', function(d) {
            d3.select(this).style({opacity: 0.2})
        })
        .append("svg:title")
        .text(function(d) { return d.name; })
}
