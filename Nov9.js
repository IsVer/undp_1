//GLOBAL VARIABLES
//Store width, height and margin in variables
const wLine = 1100;//(window.innerWidth)/2;
const hLine = 490;//(window.innerHeight/1.2);
const marginLine = {top: 6, right: 30, bottom: 30, left: 30};
let data;


d3.csv("few_data.csv", function(error, data) {
    if (error) {
        throw error;
    } else {

        // set up data on years
        let years = [], minYear = 1960;
        for (let i = 0; i < 57; i++) {years.push(minYear + i)}
        let yearsMin = d3.min(years);
        console.log("Min year in data: " + yearsMin);
        let yearsMax = d3.max(years);
        console.log("Max year in data: " + yearsMax);
        let bisectDate = d3.bisector(function(d){return d.Year;}).left;
        // data for population
        let popMax = 100, popMin = 0;

        //make object
        let countries = data.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data.map(function(d) {
                    return {year: d.Year, urbPerc: d[id]};
                })
            };
        });
        console.log(countries);

        let countryList = ["Angola","Cote dIvoire",	"Ghana", "Nigeria", "Congo DR",	"Somalia", "South Africa", "Benin" ," Botswana", "Burkina Faso","Burundi", "Cameroon", "Cape Verde","Central African Republic",	"Chad","Comoros", "Congo R", "Djibouti", "Ethiopia", "Gabon", "The Gambia", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho","Liberia", "Madagascar", "Malawi"];
        // Mali	Mauritania	Mozambique	Mauritius	Namibia	Niger	Rwanda	Senegal	Sierra Leone	South Sudan	Swaziland	Tanzania	Togo	Uganda	Zambia	Zimbabwe]

        //build graph
        let chartHeight = hLine - marginLine.top - marginLine.bottom;
        let chartWidth = wLine - marginLine.left - marginLine.right;
        let chart = d3.select("#chartLeft").append("svg")
            .attr("height", chartHeight + marginLine.top + marginLine.bottom)
            .attr("width", chartWidth + marginLine.left + marginLine.right);


        // let tooltip = d3.select("g").append("div").attr("class", "tooltip");

        // Set the ranges of the graphs lines
        let x = d3.scaleLinear().range([0,chartWidth]),
            y = d3.scaleLinear().range([chartHeight, 0]),
            z = d3.scaleOrdinal(d3.schemeCategory10);

        // create valuelines
        let line = d3.line()
            .curve(d3.curveBasis)
            .x(function (d) {return x(d.year);})
            .y(function (d) {return y(d.urbPerc); });

        // Scale the domain of the data
        x.domain([yearsMin, yearsMax]);
        y.domain([popMin, popMax]);
        // z.domain(countries.map(function(c) { return c.id; }));

        let g = chart.append('g')
            .attr("transform", "translate(" + (marginLine.left) + "," + (marginLine.top) + ")");

        let country = g.selectAll(".country")
            .data(countries)
            .enter().append("g")
            .attr("class", "country");
/////////////////////////////////////////////////////////////////////////////////////


        country.append("path")
            .attr("class", "line")
            .attr("id", function(d) { return d.id; })
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return z(d.id); });// Remove text location


        d3.select("#Gabon")
            .on("mouseover", function(){country.append("text").attr("x", 500).attr("dy", "2em").attr("class", "tooltip")
                .text(function() { return "Gabon" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});


        d3.select("#Angola")
            .on("mouseover", function(){country.append("text").attr("x", 500).attr("dy", "2em").attr("class", "tooltip")
            .text(function() { return "Angola" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});


        d3.select("#Ghana")
            .on("mouseover", function(){country.append("text").attr("x", 500).attr("dy", "2em").attr("class", "tooltip")
            .text(function() { return "Ghana" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Nigeria")
            .on("mouseover", function(){country.append("text").attr("x", 500).attr("dy", "2em").attr("class", "tooltip")
                .text(function() { return "Nigeria" ; })})
        .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location



        d3.select("#CongoDR")
            .on("mouseover", function(){country.append("text").attr("x", 500).attr("dy", "2em").attr("class", "tooltip")
                .text(function() { return "DR de Congo" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location

        d3.select("#Somalia")
            .on("mouseover", function(){country.append("text").attr("x", 500).attr("dy", "2em").attr("class", "tooltip")
                .text(function() { return "Somalia" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location


        d3.select("#SouthAfrica")
            .on("mouseover", function(){country.append("text").attr("x", 500).attr("dy", "2em").attr("class", "tooltip")
                .text(function() { return "South Africa" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        d3.select("#Benin")
            .on("mouseover", function(){country.append("text").attr("x", 500).attr("dy", "2em").attr("class", "tooltip")
                .text(function() { return "Benin" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location


        d3.select("#Botswana")
            .on("mouseover", function(){country.append("text").attr("x", 500).attr("dy", "2em").attr("class", "tooltip")
                .text(function() { return "Nigeria" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location

        d3.select("#BurkinaFaso")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Burkina Faso" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location

        d3.select("#Burundi")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Burundi" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#CotedIvoire")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Ivory Coast" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location

        d3.select("#Cameroon")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Cameroon" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location

        d3.select("#CapeVerde")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Cape Verde" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location

        d3.select("#CentralAfricanRepublic")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Central African Republic" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Chad")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Chad" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Comoros")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Comoros" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        d3.select("#CongoR")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Congo" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Djibouti")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Djibouti" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Ethiopia")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Ethiopia" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#TheGambia")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "The Gambia" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        d3.select("#Guinea")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Guinea" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location

        d3.select("#GuineaBissau")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Guinea-Bissau" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Kenya")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Kenya" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Lesotho")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Lesotho" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Liberia")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Liberia" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        d3.select("#Madagascar")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Madagascar" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        //
        d3.select("#Malawi")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Malawi" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        d3.select("#Mali")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Mali" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        d3.select("#Mauritania")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Mauritania" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Mozambique")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Mozambique" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Mauritius")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Mauritius" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        d3.select("#Namibia")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Namibia" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        d3.select("#Niger")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Niger" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Rwanda")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Rwanda" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Senegal")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Senegal" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        d3.select("#SierraLeone")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Sierra Leone" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#SouthSudan")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "South Sudan" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Swaziland")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Swaziland" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        //
        d3.select("#Tanzania")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Tanzania" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Togo")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Togo" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Uganda")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Uganda" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location
        //
        d3.select("#Zambia")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
            .text(function() { return "Zambia" ; })})
            .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location

        d3.select("#Zimbabwe")
            .on("mouseover", function(){country.append("text").attr("x", 600).attr("y", 100).attr("class", "tooltip")
                .text(function() { return "Zimbabwe" ; })})
             .on("mouseout", function () {d3.selectAll(".tooltip").remove()});  // Remove text location

        // country.append("text")
        //     .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        //     .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.urbPerc) + ")"; })
        //     .attr("x", 3)
        //     .attr("dy", "0.35em")
        //     .attr("id", "tooltip")
        //     .style("font", "10px sans-serif")
        //     .text(function(d) { return d.id; })
        //     .style("opacity", 0);

        // Create Event Handlers for mouse



/////////////////////////////


        //
        // g.selectAll(".line")
        //     .on("mouseover", function() {
        //
        //         }
        //     )

        // Add X axis
        g.append("g")
            .attr("class", "axis1 axisX1") // mind class of "axis"
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(x)
                .tickFormat(d3.format("d")))
            .selectAll("text")
            .style("text-anchor", "center")
            .attr("transform", "rotate(0)");

        // Add the Y Axis
        g.append("g")
            .attr("class", "axis1 axisY1") // mind class of "axis"
            //.attr("transform", "translate(" + (marginLine.left) + "," + marginLine.top + ")")
            .call(d3.axisLeft(y)
                .tickFormat(d3.format("d")));
        // Add text label for the y axis
        g.append("text")
            .attr("class", "labels") // attach id
            .attr("transform", "rotate(-90)")
            .attr("y", 15)
            .attr("x",-125)
            .style("text-anchor", "middle")
            .text("Urban population (in % of total population)");



        ///////////////////
//// tooptip
//         let mouseG = chart.append("g")
//             .attr("class", "mouse-over-effects");
//
//         let lines = document.getElementsByClassName('line');
//
//         mouseG.append("path") // this is the black vertical line to follow mouse
//             .attr("class", "mouse-line")
//             .style("stroke", "black")
//             .style("stroke-width", "0.4px")
//             .style("opacity", "0")
//             .style("z-index", "-1");
//
//         let mousePerLine = mouseG.selectAll('.mouse-per-line')
//             .data(countries)
//             .enter()
//             .append("g")
//             .attr("class", "mouse-per-line");
//
//         mousePerLine.append("text")
//             .attr("transform", "translate(10,3)");
//
//         mousePerLine.on('mouseout', function () { // on mouse out hide line, circles and text
//                 d3.select(".mouse-line")
//                     .style("opacity", "0");
//                 d3.selectAll(".mouse-per-line")
//                     .style("opacity", "0");
//                 d3.selectAll(".mouse-per-line text")
//                     .style("opacity", "0")})
//                 .on('mouseover', function () { // on mouse in show line, circles and text
//                         d3.select("line")
//                             .style("opacity", "1");
//                         d3.selectAll(".mouse-per-line text")
//                             .style("opacity", "1");
//                     })
//             .on('mousemove', function () { // mouse moving over canvas
//                 let mouse = d3.mouse(this);
//                 d3.select(".mouse-per-line")
//                             .attr("transform", function (d, i) {
//                                 let xDate = x.invert(mouse[0]),
//                                     bisect = d3.bisector(function (d) { return d.year; }).left;
//                                 idx = bisect(d.values, xDate);
//
//                                 d3.select(this).select('text')
//                                     .text(y.invert(y(d.values[idx].urbPerc)).toFixed(2));
//
//                                 d3.select(".mouse-line")
//                                     .attr("d", function () {
//                                         let data = "M" + x(d.values[idx].year) + "," + hLine;
//                                         data += " " + x(d.values[idx].year) + "," + 0;
//                                         return data;
//                                     });
//                                 return "translate(" + x(d.values[idx].year) + "," + y(d.values[idx].urbPerc) + ")";
//                             });
//                     });


        // mousePerLine.append("circle")
        //     .attr("r", 7)
        //     .style("stroke", function (d) {
        //         return z(d.id);
        //     })
        //     .style("fill", "none")
        //     .style("stroke-width", "1px")
        //     .style("opacity", "0");
        //
        // mousePerLine.append("text")
        //     .attr("transform", "translate(10,3)");
        //
        // mouseG.append('chart:rect') // append a rect to catch mouse movements on canvas
        //     .attr('width', wLine) // can't catch mouse events on a g element
        //     .attr('height', hLine)
        //     .attr('fill', 'none')
        //     .attr('pointer-events', 'all')
        //     .on('mouseout', function () { // on mouse out hide line, circles and text
        //         d3.select(".mouse-line")
        //             .style("opacity", "0");
        //         d3.selectAll(".mouse-per-line circle")
        //             .style("opacity", "0");
        //         d3.selectAll(".mouse-per-line text")
        //             .style("opacity", "0");
        //     })
        //     .on('mouseover', function () { // on mouse in show line, circles and text
        //         d3.select(".mouse-line")
        //             .style("opacity", "1");
        //         d3.selectAll(".mouse-per-line circle")
        //             .style("opacity", "1");
        //         d3.selectAll(".mouse-per-line text")
        //             .style("opacity", "1");
        //     })
        //     .on('mousemove', function () { // mouse moving over canvas
        //         let mouse = d3.mouse(this);
        //
        //         d3.select(".mouse-per-line")
        //             .attr("transform", function (d, i) {
        //
        //                 let xDate = x.invert(mouse[0]),
        //                     bisect = d3.bisector(function (d) { return d.year; }).left;
        //                 idx = bisect(d.values, xDate);
        //
        //                 d3.select(this).select('text')
        //                     .text(y.invert(y(d.values[idx].urbPerc)).toFixed(2));
        //
        //                 d3.select(".mouse-line")
        //                     .attr("d", function () {
        //                         let data = "M" + x(d.values[idx].year) + "," + hLine;
        //                         data += " " + x(d.values[idx].year) + "," + 0;
        //                         return data;
        //                     });
        //                 return "translate(" + x(d.values[idx].year) + "," + y(d.values[idx].urbPerc) + ")";
        //             });
        //     });



        ////////////////
        // let focus = g.append("g")
        //     .attr("class", "focus")
        //     .style("display", "none");
        //
        // focus.append("circle")
        //     .attr("r", 7.5);
        //
        // focus.append("text")
        //     .attr("x", 15)
        //     .attr("dy", ".31em")
        //     .on("mouseover", function() { focus.style("display", null); })
        //     .on("mouseout", function() { focus.style("display", "none"); })
        //     .on("mousemove", mousemove);
        //
        // chart.append("rect")
        //     .attr("transform", "translate(" + marginLine.left + "," + marginLine.top + ")")
        //     .attr("class", "overlay")
        //     .attr("width", wLine)
        //     .attr("height", hLine);
        //
        // function mousemove() {
        //     let x0 = x.invert(d3.mouse(this)[0]),
        //         i = bisectDate(data, x0, 1),
        //         d0 = data[i - 1],
        //         d1 = data[i],
        //         d = x0 - d0.Year > d1.Year - x0 ? d1 : d0;
        //     focus.attr("transform", "translate(" + x(d.Year) + "," + y(d.values) + ")");
        //     focus.select("text").text(function() { return d.values; });
        //     focus.select(".x-hover-line").attr("y2", hLine - y(d.values));
        //     focus.select(".y-hover-line").attr("x2", wLine + wLine);}

    }
    });