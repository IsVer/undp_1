// Make a group for each district
var groups = linechart.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .classed("national", function(d) {
        if (d.district == "UGANDA") return true;
        else return false;
    })
    .on("mouseover", function(d) {

        activeDistrict = d.district;

        // Setting positio for the district label
        var xPosition = wLine/2 + 35;
        var yPosition = marginLine.top - 10;

        linechart.append("text")
            .attr("id", "hoverLabel")
            .attr("x", xPosition)
            .attr("y", yPosition)
            .attr("text-anchor", "start")
            .attr("font-family", "ff-nuvo-sc-web-pro-1,ff-nuvo-sc-web-pro-2, sans-serif")
            .attr("font-size", "20px")
            .text( activeDistrict);

        d3.selectAll("rect")
            .classed("barLight", function(d) {
                if ( d.district === activeDistrict) return true;
                else return false;
            });

    }) // end of .on mouseover

    .on("mouseout", function() {
        d3.select("#hoverLabel").remove();

        d3.selectAll("rect")
            .attr("class", "barBase");

    }) // end of .on mouseout


// Append a title with the district name (for easy tooltips)
groups.append("title")
    .text(function(d) {
        return d.district;
    });

//Within each group, create a new line/path,
//binding just the div9 rate data to each one
groups.selectAll("path")
    .data(function(d) {
        return [ d.rate ];
    })
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("d", line);

//Axes
linechart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (hLine - marginLine.bottom) + ")")
    .call(xAxisLine);

linechart.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (marginLine.left) + ",0)")
    .call(yAxisLine)
    .append("text")
    .attr("x", 0 - marginLine.left)
    .attr("y", marginLine.top - 10)
    .style ("text-anchor", "start")
    .text("% of candidates who obtained a Division 9 in ");

//Labels for highlighted lines - probably better to wrap these into the line elements themselves
//with some logic for selecting the ones you want to highlight? Use anonymous function to match objects for highlighting?
//National label
linechart.append("text")
    .attr("transform", "translate(" + xLabelLine + ", " + yScaleLine(data[20][years[4]]) + ")")
    .attr("dy", ".15em")
    .attr("dx", ".25em")
    .attr("text-anchor", "start")
    .attr("class","labelNation")
    .text( + data[20][years[4]] );