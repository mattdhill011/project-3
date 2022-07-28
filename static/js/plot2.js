fireLocations = "https://raw.githubusercontent.com/ErinBuday/Project-3/main/wildfiresCleaned2.json"

function plot(year) {

    d3.json(fireLocations).then(function(data) {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var hourNames = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

        var monthCountsUndetermined = [0,0,0,0,0,0,0,0,0,0,0,0];
        var monthCountsUnknown = [0,0,0,0,0,0,0,0,0,0,0,0];
        var monthCountsHuman = [0,0,0,0,0,0,0,0,0,0,0,0];
        var monthCountsNatural = [0,0,0,0,0,0,0,0,0,0,0,0];

        var hourCountsUndetermined = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var hourCountsUnkown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var hourCountsHuman = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var hourCountsNatural = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        if (year === 0) {
            var yearName = "All Years";
        } else {
            var yearName = year;
        };    
        
        for (var i=0; i < data.data.length; i++) {
            
            var fireMonth = data.data[i][1][1] -1;
            var fireHour = data.data[i][1][0];
            var fireYear = data.data[i][1][2];
            var fireCause = data.data[i][0];

            if (year === 0) {        
                if (fireCause === "Undetermined") {
                    monthCountsUndetermined[fireMonth] += 1;
                    hourCountsUndetermined[fireHour] += 1;
                } else if (fireCause === "Unknown") {
                    monthCountsUnknown[fireMonth] += 1;
                    hourCountsUnkown[fireHour] += 1;
                } else if (fireCause === "Human") {
                    monthCountsHuman[fireMonth] += 1;
                    hourCountsHuman[fireHour] += 1;
                } else if (fireCause === "Natural") {
                    monthCountsNatural[fireMonth] += 1;
                    hourCountsNatural[fireHour] += 1;
                };
            }; 

            if (year === fireYear) {
                if (fireCause === "Undetermined") {
                    monthCountsUndetermined[fireMonth] += 1;
                    hourCountsUndetermined[fireHour] += 1;
                } else if (fireCause === "Unknown") {
                    monthCountsUnknown[fireMonth] += 1;
                    hourCountsUnkown[fireHour] += 1;
                } else if (fireCause === "Human") {
                    monthCountsHuman[fireMonth] += 1;
                    hourCountsHuman[fireHour] += 1;
                } else if (fireCause === "Natural") {
                    monthCountsNatural[fireMonth] += 1;
                    hourCountsNatural[fireHour] += 1;
                };
            }
        }

        var traceMonthUnknown = {
            x: monthNames,
            y: monthCountsUnknown,
            name: "Unknown",
            type: "bar",
            marker: {
                color: "rgb(255,77,0)"
            }
        }

        var traceMonthHuman = {
            x: monthNames,
            y: monthCountsHuman,
            name: "Human",
            type: "bar",
            marker: {
                color: "rgb(255,154,0)"
            }
        }

        var traceMonthNatural = {
            x: monthNames,
            y: monthCountsNatural,
            name: "Natural",
            type: "bar",
            marker: {
                color: "rgb(255,193,0)"
            }
        }

        var traceMonthUndetermined = {
            x: monthNames,
            y: monthCountsUndetermined,
            name: "Undetermined",
            type: "bar",
            marker: {
                color: "rgb(255,0,0)"
            }
        }

        // Hour counts

        var traceHourUnknown = {
            x: hourNames,
            y: hourCountsUnkown,
            name: "Unknown",
            type: "bar",
            marker: {
                color: "rgb(255,77,0)"
            }
        }

        var traceHourHuman = {
            x: hourNames,
            y: hourCountsHuman,
            name: "Human",
            type: "bar",
            marker: {
                color: "rgb(255,154,0)"
            }
        }

        var traceHourNatural = {
            x: hourNames,
            y: hourCountsNatural,
            name: "Natural",
            type: "bar",
            marker: {
                color: "rgb(255,193,0)"
            }
        }

        var traceHourUndetermined = {
            x: hourNames,
            y: hourCountsUndetermined,
            name: "Undetermined",
            type: "bar",
            marker: {
                color: "rgb(255,0,0)"
            }
        }

        var traceDataMonthStacked = [traceMonthUndetermined, traceMonthUnknown, traceMonthHuman, traceMonthNatural];
        var traceDataHourStacked = [traceHourUndetermined, traceHourUnknown, traceHourHuman, traceHourNatural];

        var layoutStackedMonths = {
            title: `Number of Fire Incidents by Cause (${yearName})`,
            yaxis: {
                title: "Number of Incidents",
            },
            xaxis: {
                tickangle: -45,
                title: 'Months'
            },
            margin: {
                l: 50,
                r: 100,
                t: 100,
                b: 100,
            },
            barmode: "stack"

        }

        var layoutStackedHours = {
            yaxis: {
                title: "Number of Incidents",
            },
            xaxis: {
                tickangle: -45,
                title: 'Hours'
            },
            margin: {
                l: 50,
                r: 100,
                t: 0,
                b: 100,
            },
            barmode: "stack"

        };

        Plotly.newPlot("firesByMonth", traceDataMonthStacked, layoutStackedMonths);
        Plotly.newPlot("firesByHour", traceDataHourStacked, layoutStackedHours);
        console.log("Graphs made");
    });
};

function init() {
    plot(0)
};

function optionChanged(value) {
    year = parseInt(value)
    plot(year)
};

init();