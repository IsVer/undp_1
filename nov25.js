$(document).ready(function() {
    $(window).on('scroll', function() {
        let st = $(this).scrollTop();

        $('#box-one').css({
            'transform': 'translateY('+ (st/2) +'px)'
        });
    });
});


let data1,
    svg;

// set size for each svg
let margin = {top: 45, right: 50, bottom: 20, left: 20},
    width = 240 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;


let x = d3.scaleLinear().range([0,width]),
    y = d3.scaleLinear().range([height, 0]);


// set up data1 on years
let years = [], minYear = 1960;
for (let i = 0; i < 57; i++) {years.push(minYear + i)}
let yearsMin = d3.min(years);
console.log("Min year in data1: " + yearsMin);
let yearsMax = d3.max(years);
console.log("Max year in data1: " + yearsMax);
// let bisectDate = d3.bisector(function(d){return d.Year;}).left;
// data1 for population
let popMax = 100, popMin = 0;




// draw line
let line = d3.line()
    .defined(function(d) { return d; })
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.urbPerc); });

// draw area:
let area = d3.area()
    .defined(line.defined())
    .x(function(d) { return x(d.year); })
    .y0(height)
    .y1(function(d) { return y(d.urbPerc); });


x.domain([yearsMin, yearsMax]);
y.domain([popMin, popMax]);


// load data1
d3.csv("few_data1.csv", function(error, data) {
    if (error) {
        throw error;}
    else {
        //make counties data1
        const risingGini = ["SouthAfrica", "Zambia", "Namibia", "Botswana", "Lesotho", "CentralAfricanRepublic"];
        const fallingGini = ["BurkinaFaso", "Mali", "Guinea", "Cameroon", "Ethiopia", "TheGambia", "Gambia", "Niger", "Senegal", "Sierra Leone", "Swaziland"];
        const countries = data.columns.slice(1).map(function (id) {
                    return {
                        id: id,
                        values: data.map(function (d) {
                            return {year: d.Year, urbPerc: d[id]};
                            })// for if statement
                        };
            }); // end of countries
        console.log(countries); //check full country list


        // Countries with a rising gini
        let countryList1 = [];
        for (i = 0; i < 44; i++) {
            if (risingGini.includes(countries[i].id))
            { countryList1.push(countries[i]);}
        }
        console.log(countryList1); //check first country list


        // Countries with a falling gini
        let countryList2 = [];
        for (i = 0; i < 44; i++) {
            if (fallingGini.includes(countries[i].id))
            { countryList2.push(countries[i]);}
        }
        console.log(countryList2); //check first country list



        // Add an SVG element for each country, with the desired dimensions and margin.

        svg1 = d3.select("#chart1").selectAll("svg")
            .data(countryList1).enter()
            .append("svg")
            .attr("id", function (d) {
                return "svg_" + d.id
            })
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left * 2 + "," + margin.top + ")");


        svg2 = d3.select("#chart2").selectAll("svg")
            .data(countryList2).enter()
            .append("svg")
            .attr("id", function (d) {
                return "svg_" + d.id
            })
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left * 2 + "," + margin.top + ")");


        addGraphArea(svg1);
        addLine(svg1);
        addToolTip(svg1);
        addAxisX(svg1);
        addAxisY(svg1);
        addLabel(svg1);

        addGraphArea(svg2);
        addLine(svg2);
        addToolTip(svg2);
        addAxisX(svg2);
        addAxisY(svg2);
        addLabel(svg2);


        function addGraphArea(svg) {
            svg.append("path")
                .attr("class", "area")
                .attr("d", function (d) {
                    return area(d.values)
                })
                .on("mouseover", function (d) {
                    return showToolTip(d)
                })
                .on("mouseout", function (d) {
                    return hideToolTip(d)
                })
                .on("mousemove", function (d) {
                    return updateTooltip(d)
                });
        } // closing addGraphArea


        function addLine(svg) {
            svg.append("path")
                .attr("class", "line")
                .attr("id", function (d) {
                    return "line_" + d.id
                })
                .attr("d", function (d) {
                    return line(d.values)
                });
        } // closing addLine for path elements. Note: the y-domain is set per element.


        function addToolTip(svg) {

            let tooltip = svg.append("g")
                .attr("class", "tooltip")
                .attr("id", function (d) {
                    return "tooltip_" + d.id
                })
                .style("opacity", 0.0);

            tooltip.append("rect")
                .attr("width", 0.5 * width)
                .attr("height", 0.5 * height)
                .style('pointer-events', 'all')
                .attr("fill", "#ffe928")
                .style("opacity", 0.9);

            tooltip.append("text")
                .attr("x", 30)
                .attr("dy", "1.2em")
                .style("text-anchor", "middle")
                .style("z-index", "3")
                .attr("font-size", "12px")
                .attr("font-weight", "bold")
                .text(function (d,i) {
                    // console.log(d);
                    return y();
                });

            tooltip.append('line')
                .classed('x', true);

            tooltip.append('line')
                .classed('y', true);
        }


        function showToolTip(d) {
            d3.selectAll("#tooltip_" + d.id)
                .style("opacity", 1.0);

            d3.select("#line_" + d.id)
                .style("stroke", "#ffc51b");
        }

        function hideToolTip(d) {
            d3.selectAll("#tooltip_" + d.id)
                .style("opacity", .0);

            d3.select("#line_" + d.id)
                .style("stroke", "#cec6b9");
        }


        function updateTooltip(d, i) {
            //     let data1Point = d.values[i];
            // console.log(data1Point, i, d);
            d3.selectAll("#tooltip_" + d.id)
                .style("opacity", 0.6);

        }

        function addAxisX(svg) {
            svg.append("g")
                .attr("class", "axis axisX") // class of "axis"
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x)
                    .tickFormat(d3.format("d"))
                    .ticks(5))
                .selectAll("text") //
                .style("text-anchor", "center")
                .attr("transform", "rotate(0)");
        }

        function addAxisY(svg) {
            // Add the Y Axis
            svg.append("g")
                .attr("class", "axis axisY") // mind class of "axis"
                .attr("transform", "translate(" + (margin.left - 20) + ", 0)")
                .call(d3.axisLeft(y)
                    .tickFormat(d3.format("d")));

            //text label
            d3.selectAll("g").append("text") // label next to y axis
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .attr("class", "graphText")
                .attr("class", "axisY_descr")
                .text("Urban population as % from total");
        }


        function addLabel(svg) {
            // Add a small label for each country.
            svg.append("text")
                .attr("x", 50)
                .attr("y", height - 145)
                .style("text-anchor", "start")
                .attr("class", "graphText")
                .text(function (d) {
                    return d.id
                });
        }



    } // keep for else within call back

}); // keep as finish of callback function and data1 load




// // load data1set 2
// d3.csv("gdp_growth.csv", function(error, data1) {
//
//     if (error) {
//         throw error;}
//     else {
//
//        // make counties data1
//         let gdps = d3.nest()
//             .key(function(d) {
//                 return d.CountryCode;})
//             .entries(data1);
//         // function removeStrings =
//         console.log(gdps);


        // let filteringdata1 = d3.keys(data1[0]).filter(function(key) {
        //     return (key !== "CountryName");
        // });
        //  console.log(filteringdata1);

        //  // make counties data1
        //  let gdps = d3.nest()
        //      .key(function(d) {
        //          return d.CountryCode;})
        //      .entries(data1);
        //  console.log(gdps);
        //
        // Add an SVG element for each country, with the desired dimensions and margin.
        // let svg_ = d3.selectAll(svg)
        //     .data1(gdps)
        //     .enter().append("g")
        //     .attr("id", function (d) {
        //         return "svg_" + d.CountryCode
        //     })
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr("transform", "translate(" + margin.left * 2 + "," + margin.top + ")");

        //
        // // ;addGraphArea(svg2)
        // // addLine(svg_);
        // // addToolTip(svg2);
        //
        //
        // // function addGraphArea(svg) {
        // //     svg.append("path")
        // //         .attr("class", "area")
        // //         .attr("d", function (d) {
        // //             return area(d.values)
        // //         })
        // //         .on("mouseover", function (d) {
        // //             return showToolTip(d)
        // //         })
        // //         .on("mouseout", function (d) {
        // //             return hideToolTip(d)
        // //         })
        // //         .on("mousemove", function (d) {
        // //             return updateTooltip(d)
        // //         });
        // // // } // closing addGraphArea
        // // //
        // //
        // function addLine(svg) {
        //     svg_.append("path")
        //         .attr("id", function (d) {
        //             return "line_" + d.CountryCode;
        //         })
        //         .attr("d", function (d) {
        //             return line(d.values)
        //         });
        // } // closing addLine for path elements. Note: the y-domain is set per element.

        //
        // function addToolTip(svg) {
        //
        //     let tooltip = svg.append("g")
        //         .attr("class", "tooltip")
        //         .attr("id", function (d) {
        //             return "tooltip_" + d.id
        //         })
        //         .style("opacity", 0.0);
        //
        //     tooltip.append("rect")
        //         .attr("width", 0.5 * width)
        //         .attr("height", 0.5 * height)
        //         .style('pointer-events', 'all')
        //         .attr("fill", "red")
        //         .style("opacity", 0.9);
        //
        //     tooltip.append("text")
        //         .attr("x", 30)
        //         .attr("dy", "1.2em")
        //         .style("text-anchor", "middle")
        //         .style("z-index", "3")
        //         .attr("font-size", "12px")
        //         .attr("font-weight", "bold")
        //         .text(function (d) {
        //             // console.log(d);
        //             return y(d.year);
        //         });
        //
        //     tooltip.append('line')
        //         .classed('x', true);
        //
        //     tooltip.append('line')
        //         .classed('y', true);
        // }
        //
        //
        // function showToolTip(d) {
        //     d3.selectAll("#tooltip_" + d.id)
        //         .style("opacity", 1.0);
        //
        //     d3.select("#line_" + d.id)
        //         .style("stroke", "blue");
        // }
        //
        // function hideToolTip(d) {
        //     d3.selectAll("#tooltip_" + d.id)
        //         .style("opacity", .0);
        //
        //     d3.select("#line_" + d.id)
        //         .style("stroke", "#cec6b9");
        // }
        //
        //
        // function updateTooltip(d, i) {
        //     //     let data1Point = d.values[i];
        //     // console.log(data1Point, i, d);
        //     d3.selectAll("#tooltip_" + d.id)
        //         .style("opacity", 0.6);
        //
        //     // work on lines probably wrong
        //     const focus = svg.append('g')
        //         .attr('class', 'focus')
        //         .style('display', 'none');
        // };
        //
        //
        //
        //
        // // .on("mouseover", function() { tooltip.style("display", null); })
        // // .on("mouseout", function() { tooltip.style("display", "none"); })
        // // .on("mousemove", function(d) {
        // //     console.log(d.id);
        // //     let xPosition = d3.mouse(this)[0] - 5;
        // //     let yPosition = d3.mouse(this)[1] - 5;
        // //     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        // //     tooltip.select("text").text(d.year);
        // // }); // mouseover business
        //
        //
        // // Add a small label for each country.
        // svg.append("text")
        //     .attr("x", 50)
        //     .attr("y", height - 145)
        //     .style("text-anchor", "start")
        //     .attr("class", "graphText")
        //     .text(function (d) {
        //         return d.id
        //     });
        //
        //
        // svg.append("g")
        //     .attr("class", "axis axisX") // class of "axis"
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x)
        //         .tickFormat(d3.format("d"))
        //         .ticks(5))
        //     .selectAll("text") //
        //     .style("text-anchor", "center")
        //     .attr("transform", "rotate(0)");
        //
        // // Add the Y Axis
        // svg.append("g")
        //     .attr("class", "axis axisY") // mind class of "axis"
        //     .attr("transform", "translate(" + (margin.left - 20) + ", 0)")
        //     .call(d3.axisLeft(y)
        //         .tickFormat(d3.format("d")));
        //
        // //text label
        // d3.selectAll("g").append("text") // label next to y axis
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 6)
        //     .attr("dy", ".71em")
        //     .style("text-anchor", "end")
        //     .attr("class", "graphText")
        //     .attr("class", "axisY_descr")
        //     .text("Urban population as % from total");

//
//
//     } // keep for else within call back
//
//
// });
//



