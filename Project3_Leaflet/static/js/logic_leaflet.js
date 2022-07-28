// Adding light mode tile layer to the map
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


var baseMaps = {
	"Street": street,
	"Satellite": googleSat,
	"Topography": topo
};


// Hours and Months layers
var layers = {
        HOURS_0_3: new L.LayerGroup(),
	HOURS_3_6: new L.LayerGroup(),
	HOURS_6_9: new L.LayerGroup(),
	HOURS_9_12: new L.LayerGroup(),
	HOURS_12_15: new L.LayerGroup(),
	HOURS_15_18: new L.LayerGroup(),
	HOURS_18_21: new L.LayerGroup(),
	HOURS_21_24: new L.LayerGroup(),
	may: new L.LayerGroup(),
	june: new L.LayerGroup(),
	july: new L.LayerGroup(),
};


// Create map object
var myMap = L.map("map", {
        center: [37.09, -120.71],
        zoom: 6,
	layers: [layers.HOURS_0_3, layers.HOURS_3_6, layers.HOURS_6_9, layers.HOURS_9_12, layers.HOURS_12_15, layers.HOURS_15_18, layers.HOURS_18_21,
		layers.HOURS_21_24] 
});

street.addTo(myMap);

var overlayMaps = {
        "12am - 3am": layers.HOURS_0_3,
	"3am - 6am": layers.HOURS_3_6,
	"6am - 9am": layers.HOURS_6_9,
	"9am - 12pm": layers.HOURS_9_12,
	"12pm - 3pm": layers.HOURS_12_15,
	"3pm -6pm": layers.HOURS_15_18,
	"6pm - 9pm": layers.HOURS_18_21,
	"9pm - 12am": layers.HOURS_21_24,
        "May": layers.may,
        "June": layers.june,
        "July": layers.july	
};

L.control.layers(baseMaps, overlayMaps, {
}).addTo(myMap);

// Store our API endpoint inside queryUrl

var url = "https://raw.githubusercontent.com/huddack20/project3-geojson-datafile/main/WFIGS_-_Current_Wildland_Fire_Locations.geojson"
//var url = "WFIGS_-_Wildland_Fire_Locations_Full_History.geojson"
// Historical Data -  var url = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Fire_History_Perimeters_Public/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"

d3.json(url).then(function(response) {

	function getColor(m) {
    		return m >= 23 ? "rgb(128, 0, 0)" :
           		m >= 22 ? "rgb(255, 127, 80)" :
           		m >= 21 ? "rgb(150, 128, 114)" :
           		m >= 20 ? "rgb(0, 0, 255)" :
           		m >= 19 ? "rgb(0, 255, 255)" :
           		m >= 18 ? "rgb(107, 142, 35)" :
           		m >= 17 ? "rgb(0, 100, 0)" :
           		m >= 16 ? "rgb(173, 255, 0)" :
           		m >= 15 ? "rgb(0, 128, 0)" :
           		m >= 14 ? "rgb(0, 255, 127)" :
			m >= 13 ? "rgb(255, 127, 80)" :
                        m >= 12 ? "rgb(0, 0, 0)" :
                        m >= 11 ? "rgb(255, 165, 0)" :
                        m >= 10 ? "rgb(255, 215, 0)" :
                        m >= 9 ? "rgb(255, 0, 0)" :
                        m >= 8 ? "rgb(199, 21, 133)" :
                        m >= 7 ? "rgb(0, 255, 255)" :
                        m >= 6 ? "rgb(0, 0, 255)" :
                        m >= 5 ? "rgb(107, 142, 35)" :
                        m >= 4 ? "rgb(0, 100, 0)" :
                        m >= 3 ? "rgb(173, 255, 0)" :
                        m >= 2 ? "rgb(0, 128, 0)" :
                        m >= 1 ? "rgb(0, 255, 127)" :
           		"rgb(0, 0, 0)";
        }

	 function getColorMonth(m) {
                return m === "Jan" ? "rgb(128, 0, 0)" :
                        m === "Mar" ? "rgb(255, 127, 80)" :
                        m === "Jun" ? "blue" :
                        m === "Sep" ? "rgb(0, 255, 127)" :
                        "rgb(0, 0, 0)";
        }


	function getRadius(r) {

                return 10000;

        }


        var monthFeatures = response.features;

  	for(var i=0; i < monthFeatures.length; i++) {

		// monthFeatures[i].properties.FireDiscoveryDateTime !== null
	
		if (monthFeatures[i].properties.POOState === "US-CA" && monthFeatures[i].properties.FireDiscoveryDateTime !== null) {

			var date = new Date(monthFeatures[i].properties.FireDiscoveryDateTime);

			var pstDate = date.toLocaleString('en-US', {timeZone: 'America/Los_Angeles',});

			var utcHours = date.getUTCHours();
			var pstHours = date.getUTCHours() - 7;
			var dates = date.getDate();

			if (pstHours < 0) {
				hours = pstHours + 24
			}
			else {
				hours = pstHours
			}

			var months = date.getMonth() + 1;
			
			var coordinates = monthFeatures[i].geometry.coordinates;

                        var acres = monthFeatures[i].properties.CalculatedAcres

                        var shortDescription = monthFeatures[i].properties.IncidentShortDescription;

                        if (shortDescription === null) {
                                shortDescription = "No Description Recorded"
                        }


			if (hours < 3) {

				L.circle(
					[coordinates[1], coordinates[0]], {
						fillOpacity: 0.75,
						//fillColor: getColor(hours),
						color: "#180f44",
						weight: 1.5,
						radius: getRadius(acres)
					}).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.HOURS_0_3);
			}
			else if (hours < 6) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "#312678",
                                                weight: 1.5,
                                                radius: getRadius(acres)
                                        }).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.HOURS_3_6);

                        }
			else if (hours < 9) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "#c93e71",
                                                weight: 1.5,
                                                radius: getRadius(acres)
                                        }).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.HOURS_6_9);

                        }
			else if (hours < 12) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "#e96c72",
                                                weight: 1.5,
                                                radius: getRadius(acres)
                                        }).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.HOURS_9_12);

                        }
			else if (hours < 15) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "#ecc36f",
                                                weight: 1.5,
                                                radius: getRadius(acres)
                                        }).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.HOURS_12_15);

                        }
			else if (hours < 18) {
				L.circle(
					[coordinates[1], coordinates[0]], {
						fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "#e96c72",
                                                weight: 1.5,
                                                radius: getRadius(acres)
					}).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.HOURS_15_18);

			}
			else if (hours < 21) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "#c93e71",
                                                weight: 1.5,
                                                radius: getRadius(acres)
                                        }).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.HOURS_18_21);

                        }
			else {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "#312678",
                                                weight: 1.5,
                                                radius: getRadius(acres)
                                        }).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.HOURS_21_24);
                        }
		
			// Draw circles by month
                        if (months === 5) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                fillColor: "rgb(255,0,0)",
                                                color: "violet",
                                                weight: 1.5,
                                                radius: getRadius(acres)
                                        }).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.may);

                        }
                        else if (months === 6) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.25,
                                                fillColor: "rgb(255,154,0)",
                                                color: "blue",
                                                weight: 1.5,
                                                radius: getRadius(acres)
                                        }).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.june);

                        }
                        else {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                fillColor: "rgb(255,193,0)",
                                                color: "red",
                                                weight: 2.5,
                                                radius: getRadius(acres)
                                        }).bindPopup(`
                                        <h3>${monthFeatures[i].properties.IncidentName}</h3>
                                        <p>${shortDescription}<br>
                                        County: ${monthFeatures[i].properties.POOCounty}<br>
                                        Fire Cause: ${monthFeatures[i].properties.FireCause}</p>
                                        <hr><p>${pstDate}<br>
                                        ${coordinates[1]}, ${coordinates[0]}</p>`).addTo(layers.july);

                        }


		};

	};

	// Legend Section getColor(grades[i])
	var legend = L.control({position: 'bottomright'});
        legend.onAdd = function(myMap) {

                var div = L.DomUtil.create('div', 'info legend')

		div.innerHTML += `<p>Time<hr>
                <i style="background:#180f44"></i>12am-3am<br>
                <i style="background:#312678"></i>3am-6am<br>
                <i style="background:#c83e71"></i>6am-9am<br>
                <i style="background:#e96c72"></i>9am-12pm<br>
                <i style="background:#ecc36f"></i>12pm-3pm<br>
                <i style="background:#e96c72"></i>3pm-6pm<br>
                <i style="background:#c83e71"></i>6pm-9pm<br>
                <i style="background:#321678"></i>9pm-12am</p>`

                return div;
	};
        legend.addTo(myMap);

	var legend1 = L.control({position: 'bottomleft'});
        legend1.onAdd = function(myMap) {

                var div = L.DomUtil.create('div', 'info legend')

		div.innerHTML += `<p>Month<hr>
                <i style="background:rgb(255,0,0)"></i>May<br>
                <i style="background:rgb(255,154,0)"></i>June<br>
                <i style="background:rgb(255,193,0)"></i>July</p>`

                return div;
        };
        legend1.addTo(myMap);

});

