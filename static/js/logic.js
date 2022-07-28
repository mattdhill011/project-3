fireLocations = "https://raw.githubusercontent.com/mattdhill011/project-3/main/WFIGS_-_Current_Wildland_Fire_Locations.geojson"
fireBoundries = "https://raw.githubusercontent.com/mattdhill011/project-3/main/WFIGS_-_Current_Wildland_Fire_Perimeters.geojson"

d3.json(fireLocations).then(function(fireLocations) {

    console.log(fireLocations)

    // Create the tile layer that will be the background of our map.
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var map = L.map("map", {
        center: [0,0],
        zoom: 3,
        layers: [streetmap]

    });

    for (var i =0; i < fireLocations.features.length; i++) {

        var color = "";

        var coord = [fireLocations.features[i].geometry.coordinates[1], fireLocations.features[i].geometry.coordinates[0]]

        L.circle(coord, {
            fillOpacity: 0.75,
            color: "black",
            fillColor: color,
            radius: 1
        }).addTo(map);


    };

    d3.json(fireBoundries).then(function(fireBoundries) {
        for (var i = 0; i < fireBoundries.features.length; i++) {
            var boundryCoord = fireBoundries.features[i].geometry.coordinates[0];
            var correctedCoord = []
            
            function reverseCoords(coords) {
                return [coords[1], coords[0]];
            };

            
            for (var j = 0; j < boundryCoord.length; j++) {
                correctedCoord.push(reverseCoords(boundryCoord[j]))            

            };
    
            L.polygon(correctedCoord, {
                color:"red",
                fillColor:"red"
            }).addTo(map);
        }
    });
});

