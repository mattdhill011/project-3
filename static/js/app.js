

// SELECT FIELDS & DIVS
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// FUNCTION #1 of 4
function buildCharts(year) {

    // READ & INTERPRET THE DATA
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Read in the JSON data
    d3.json(// insert data link).then((data => {

        // Define samples
        var samples = //insert
        var metadata = //insert
        var filteredMetadata = metadata.filter( //insert => //insert == //insert)[0]

        // Filter by year
        var filteredSample = samples.filter(insert => insert == insert)[0]

        // Create variables for chart
        // Select sample_values for the line graph
        var sample_values = filteredSample.sample_values

        // Use fire caues as the labels for line graph
        var fire_cause = filteredSample.fire_cause

        // use ? as the hovertext for bar chart
        // var ? = filteredSample.fire_cause

        // Line Graph
        // Create the trace
        var line_data = [{
            // Use monthNames for the x values
            x: monthNames.slice(0, 10).reverse(),
            // Use sample_values for the y values
            y: monthCounts.slice(0, 10).map(year => `YEAR ${year}`).reverse(),
            // Use otu_labels for the text values
            text: otu_labels.slice(0, 10).reverse(),
            type: 'line',
            orientation: 'h',
            marker: {
                color: 
            },
        }]




        // Define plot layout
        var line_layout = {
            title: "Wildfire Causes and Frequency",
            xaxis: { title: "Months" },
            yaxis: { title: "Number of Fires" }
        };

        // GAUGE CHART
        // Create variable for washing frequency
        var fireFrequency = filteredMetadata.fireFrequency

        // Create the trace
        var gauge_data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: fireFrequency,
                title: { text: "Fire Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    bar: {color: 'white'},
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 3], color: 'rgb(253, 162, 73)' },
                        { range: [3, 6], color: 'rgb(242, 113, 102)' },
                        { range: [6, 9], color: 'rgb(166, 77, 104)' },
                    ],
                    // threshold: {
                    //     line: { color: "white" },
                    // }
                }
            }
        ];

        // Define Plot layout
        var gauge_layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };

        // Display plot
        Plotly.newPlot('gauge', gauge_data, gauge_layout);
    }))


};

// FUNCTION #3 of 4
function optionChanged(year) {
    console.log(year);
    buildCharts(year);
    populateDemoInfo(year);
}

// FUNCTION #4 of 4
function initDashboard() {
    var dropdown = d3.select("#selDataset")
    d3.json(// include data link).then(data => {
        var years = data.names;
        years.forEach(year => {
            dropdown.append("option").text(year).property("value", year)
        })
        buildCharts(year[0]);
        populateDemoInfo(years[0]);
    });
};

initDashboard();
