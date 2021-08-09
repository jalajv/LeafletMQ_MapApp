// default map layer
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [20.593684, 78.96288],
    zoom: 5
});

function runDirection(start, end) {
        
    // recreating new map layer after removal
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [20.593684, 78.96288],
        zoom: 5
    });
    
    var dir = MQ.routing.directions();

    dir.route({
        locations: [
            start,
            end
        ]
    });


    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'assets/images/red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        },

        createEndMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'assets/images//blue.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        }
    });
    
    map.addLayer(new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    })); 
}


// function that runs when form submitted
function submitForm(event) {
    debugger;
//default action that belongs to the event will not occur
event.preventDefault();

// delete current map layer
map.remove();

// getting form data
start = document.getElementById("start").value;
end = document.getElementById("destination").value;

// run directions function
runDirection(start, end);

// reset form
document.getElementById("form").reset();
console.log("Form Submitted");
}

// asign the form to form variable
const form = document.getElementById('form');

// call the submitForm() function when submitting the form
form.addEventListener('submit', submitForm);