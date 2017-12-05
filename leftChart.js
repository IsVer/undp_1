//GLOBAL VARIABLES
//Store width, height and margin in variables
const wLine = window.innerWidth/1.7;//(window.innerWidth)/2;
const hLine = 450;//(window.innerHeight/1.2);
const marginLine = {top: 15, right: 10, bottom: 40, left: 90};
let activeCountry;
let data;


d3.csv("./Data/few_data.csv", function(error, data) {
    if (error) {
        throw error;
    } else {

//CLEANING THE DATA
        let countries = ["Angola","Benin","Botswana","Burkina Faso", 'Burundi', 'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros', 'Democratic Republic of the Congo', 'Republic of the Congo', 'Cote d\'Ivoire', 'Djibouti', 'Ethiopia', 'Gabon', 'The Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Mozambique', 'Namibia', 'Niger', 'Reunion', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'Sudan', 'Swaziland', 'Tanzania', 'Togo', 'Uganda', 'Zambia', 'Zimbabwe'];

        // Only countries in SSA
        let dataForChart = [];
        for (let item of countries) {
            for (let column of data) { //clean data
                if (column.Country.includes(item)) {
                                    dataForChart.push(column)
                } //close if
            }
        } // close for loops

 // set up data on years
        let years = [];
        let yearlist = function (y) {
            for (let i in dataForChart) {
                if ((y.includes(dataForChart[i].Year))) {
                    console.log(dataForChart[1].Year);
                }
                else {
                    y.push(data[i].Year);
                } // close else
            } // close for
            return y;
        }; //All years to use:
        yearlist(years);
        let sortedYears = years.sort();
        // find extremes
        let yearsMin = d3.min(years);
        console.log("Min year in data: " + yearsMin);
        let yearsMax = d3.max(years);
        console.log("Max year in data: " + yearsMax);

        // get highest Gini
        let allGiniRow = [];
        for(row of dataForChart) {
            allGiniRow.push(row.Gini);
        }
        let giniMax = d3.max(allGiniRow);
        console.log("Highest Gini in SSA: " + giniMax);

        console.log(countries[1]);

// BUILD DIRECTORY FOR GRAPH
        console.log(dataForChart); // check format dataForChart
        // check format dataForChart
        let dataGraph = {};
        for (let i of countries) {
            let obKey = i;
            yearData = [];
            // console.log(obKey); //check
            for (let k in dataForChart) {
                if (dataForChart[k].Country === obKey) {
                    let oneYearData = {
                        'year': dataForChart[k].Year,
                        'gini': dataForChart[k].Gini
                    };
                    yearData.push(oneYearData);
                }
                dataGraph[obKey] = yearData;
            }
        }
 //console.log(dataGraph["Benin"]); //check if correct data


// BUILDING ELEMENTS
        //Create an empty svg called "chart"
        let chartHeight = hLine - marginLine.top - marginLine.bottom;
        let chartWidth = wLine - marginLine.left - marginLine.right;
        let chart = d3.select("#chartLeft").append("svg")
            // .attr("width", wLine + 60)
            // .attr("height", hLine - (marginLine.bottom - 150))
            .attr("height", chartHeight + marginLine.top + marginLine.bottom)
            .attr("width", chartWidth + marginLine.left + marginLine.right);


        let g = chart.append('g')
                    .attr("transform", "translate(" + (marginLine.left) + "," + (marginLine.top) + ")");

        // let tooltip = d3.select("g").append("div").attr("class", "tooltip");

        // Set the ranges of the graphs lines
        let x = d3.scaleLinear().range([0,chartWidth]);
        let y = d3.scaleLinear().range([chartHeight, 0]);

        // Scale the range of the data
        x.domain([yearsMin, yearsMax]);
        y.domain([0, giniMax]);


        for (let key in dataGraph) {
                if (dataGraph.hasOwnProperty(key)) {
                    console.log(key + " >> " + dataGraph[key]);
                    let hoverCountryLine = key;
                    //activeCountry = key; // this is for showing the country when hovering over the line

                    let data = dataGraph[key];
                    console.log(data[1]); //check what data is

                    // create valuelines
                    let valueline = d3.line()
                        .x(function (d) {
                            return x(d.year);
                        })
                        .y(function (d) {
                            return y(d.gini);
                        });

                    // Add the valueline path.
                    g.append("path") // class "line"
                        .data([data])
                        .attr("class", "line")
                        .attr("d", valueline)
                        .append("svg:title")
                        .attr('class', 'tooltip')
                        .text(function() {return key });


                    // g.append("line").data([data])
                    //     .attr('class', 'historyLine')
                    //     .attr("y1", y(0))
                    //     .attr("y2", y(100))
                    //     .attr('x1', x(2008))
                    //     .attr('x2', x(2008))
                    //     .attr("stroke", "red")
                    //     .attr( "stroke-width", ".4");



                //     d3.selectAll('path')
                //         append
                //         .on("mouseover", function () {
                //     d3.select('tooltip')
                //         .transition()
                //         .duration(200)
                //         .style("opacity", 1)
                //         .html('key')
                //         .style("left", (d3.event.pageX) + "px")
                //         .style("top", (d3.event.pageY - 28) + "px");
                // })
                //         .on("mouseout", function () {
                //             d3.select('tooltip')
                //                 .transition()
                //                 .duration(500)
                //                 .style("opacity", 0);
                //         });
                // g.select('line').data([data]).enter().append("line")
                //     attr('class', 'history')
                //     attr('x', function(d){
                //         if (d.year = 1994)
                //             return
                //     })
                //
                }}//hold

// Add X axis
        //et xStart = chartHeight - marginLine.bottom - marginLine.top;
        g.append("g")
            .attr("class", "axis") // mind class of "axis"
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(x)
                .tickFormat(d3.format("d")))
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("transform", "rotate(-65)");


// Add the Y Axis
        g.append("g")
            .attr("class", "axis") // mind class of "axis"
            //.attr("transform", "translate(" + (marginLine.left) + "," + marginLine.top + ")")
            .call(d3.axisLeft(y)
                .tickFormat(d3.format("d"))
            );
// Add text label for the y axis
        g.append("text")
            .attr("class", "labels") // attach id
            .attr("transform", "rotate(-90)")
            .attr("y", -43)
            .attr("x",0 - (chartHeight / 2))
            .style("text-anchor", "middle")
            .text("Gini coefficient (in %)");

    } // closes else after error
}); // closes data read and call back