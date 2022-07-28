fireLocations = "https://raw.githubusercontent.com/ErinBuday/Project-3/main/wildfiresCleaned.json"

d3.json(fireLocations).then(function(data) {

    function init() {

        var monthCounts = [0,0,0,0,0,0,0,0,0,0,0,0]
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

        var hourCounts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        var hourNames = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"]
        
        for (var i=0; i < Object.keys(data.FireDiscoveryDateTime).length; i++) {
            
            fireMonth = data.LocalMonth[i] -1;

            fireHour = data.LocalTimeOfDay[i];
            console.log(fireHour);
            monthCounts[fireMonth] += 1;

            hourCounts[fireHour] +=1;
        };       

        var trace1 = {
            x: monthNames,
            y: monthCounts,
            type: "bar"
        };

        var trace2 = {
            x: hourNames,
            y: hourCounts,
            type: "bar"
        };


        var traceData = [trace1];
        var traceData2 = [trace2]

        var layout = {
            maring: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        }

        Plotly.newPlot("firesByMonth", traceData, layout);
        plotly.newPlot("firesByHour", traceData2, layout)

    }
   init()
})
