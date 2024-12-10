if (window.screen.width <= 1130) {
    function removeall() {
        document.querySelectorAll(".cir_border").forEach(el => el.style.border = "none");
    }

    document.getElementById("sec").addEventListener("click", function () {
        removeall();
        this.style.border = "2px solid whitesmoke";
        this.style.borderRadius = "20px";
    });

    document.getElementById("pri").addEventListener("click", function () {
        removeall();
        this.style.border = "2px solid whitesmoke";
        this.style.borderRadius = "20px";
    });

    document.getElementById("tri").addEventListener("click", function () {
        removeall();
        this.style.border = "2px solid whitesmoke";
        this.style.borderRadius = "20px";
    });

    document.getElementById("quad").addEventListener("click", function () {
        removeall();
        this.style.border = "2px solid whitesmoke";
        this.style.borderRadius = "20px";
    });

    document.getElementById("quint").addEventListener("click", function () {
        removeall();
        this.style.border = "2px solid whitesmoke";
        this.style.borderRadius = "20px";
    });

    document.getElementById("hex").addEventListener("click", function () {
        removeall();
        this.style.border = "2px solid whitesmoke";
        this.style.borderRadius = "20px";
    });
    document.getElementById("hexe").addEventListener("click", function () {
        removeall();
        this.style.border = "2px solid whitesmoke";
        this.style.borderRadius = "20px";
    });

    document.getElementById("hept").addEventListener("click", function () {
        removeall();
        this.style.border = "2px solid whitesmoke";
        this.style.borderRadius = "20px";
    });
}

document.getElementById("about").addEventListener("mouseover", introAboutLogoTransition);

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", function () {
        document.body.classList.toggle("blue");
    });
});

// Light/Dark toggle
const checkbox = document.getElementById("checkbox");

function introAboutLogoTransition() {
    document.getElementById("about-quad").style.top = "70%";
    document.getElementById("about-quad").style.opacity = "1";
}

function checkDarkMode() {
    if (
        localStorage.getItem("tourism_website_darkmode") !== null &&
        localStorage.getItem("tourism_website_darkmode") === "true"
    ) {
        document.body.classList.add("dark");
        checkbox.checked = true;
    }
}
checkDarkMode();

checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("tourism_website_darkmode", document.body.classList.contains("dark"));
});

// scroll button
let mybutton = document.getElementById("upbtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Update Navbar While Scrolling
function updateNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links li a");

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();

        if (window.screen.width <= 425) {
            if (rect.top <= 1300) {
                navLinks.forEach((navLink) => {
                    navLink.classList.remove("active");
                });
                navLinks[index].classList.add("active");
            }
        } else if (425 < window.screen.width && window.screen.width <= 768) {
            if (rect.top <= 1250) {
                navLinks.forEach((navLink) => {
                    navLink.classList.remove("active");
                });
                navLinks[index].classList.add("active");
            }
        } else {
            if (rect.top <= 1000) {
                navLinks.forEach((navLink) => {
                    navLink.classList.remove("active");
                });
                navLinks[index].classList.add("active");
            }
        }
    });
}

window.addEventListener("scroll", updateNav);

// Map modal
let map;
let markers;
const modal = document.getElementById('map-modal');
const exploreBtn = document.getElementById('explore-btn');
const closeBtn = document.getElementsByClassName('close')[0];
const mapElement = document.getElementById('map');
const placeInfo = document.getElementById('place-info');

exploreBtn.onclick = function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';// Prevent scrolling when modal is open
    initMap();
}

closeBtn.onclick = function() {
   closeMapModal();
   resetMap();
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeMapModal();}
        // Do not reset map when clicking outside
    else if (!mapElement.contains(event.target) && !placeInfo.contains(event.target)) {
        closePlaceInfo();}
}

window.addEventListener('scroll', () => {
    if (mapContainer.style.display === 'flex') {
        mapContainer.style.display = 'none';}
});

function closeMapModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; }// Re-enable scrolling


function resetMap() {
    if (map) {
        map.setView([20, 0], 2); // Reset to initial view
        if (markers) {
            markers.clearLayers();} // Clear all markers
        addMarkersToMap(); // Re-add markers
    }
}

function closePlaceInfo() {
    placeInfo.style.display = 'none';
}

// Initialize map
function initMap() {
    if (!map) {
        map = L.map('map', {
            center: [20, 0],
            zoom: 2,
            minZoom: 1.6,
            maxZoom: 18,
            maxBounds: [[-90, -180], [90, 180]],
            maxBoundsViscosity: 1.0
        });
       
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            noWrap: true,
            bounds: [[-90, -180], [90, 180]] 
        }).addTo(map);
        markers = L.markerClusterGroup();
        addMarkersToMap();
    }
   
}

function addMarkersToMap() {
        const touristPlaces = [
            { name: 'Eiffel Tower', lat: 48.8584, lon: 2.2945, type: 'Landmark', image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { name: 'Machu Picchu', lat: -13.1631, lon: -72.5450, type: 'Historical Site', image: 'https://images.pexels.com/photos/14038161/pexels-photo-14038161.jpeg' },
            { name: 'Great Wall of China', lat: 40.4319, lon: 116.5704, type: 'Historical Site', image: 'https://images.pexels.com/photos/18709771/pexels-photo-18709771/free-photo-of-great-wall-of-china.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { name: 'Taj Mahal', lat: 27.1751, lon: 78.0421, type: 'Historical Site', image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg' },
            { name: 'Grand Canyon', lat: 36.0544, lon: -112.1401, type: 'Natural Wonder', image: 'https://images.pexels.com/photos/63553/pexels-photo-63553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { name: 'Santorini', lat: 36.3932, lon: 25.4615, type: 'Island', image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { name: 'Angkor Wat', lat: 13.4125, lon: 103.8670, type: 'Historical Site', image: 'https://images.pexels.com/photos/19217347/pexels-photo-19217347/free-photo-of-group-of-buddhist-monks-in-front-of-angkor-wat-temple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { name: 'Bora Bora', lat: -16.5004, lon: -151.7415, type: 'Island', image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { name: 'Petra', lat: 30.3285, lon: 35.4444, type: 'Historical Site', image: 'https://images.pexels.com/photos/4388165/pexels-photo-4388165.jpeg' },
            { name: 'Yellowstone National Park', lat: 44.4280, lon: -110.5885, type: 'National Park', image: 'https://images.pexels.com/photos/9422720/pexels-photo-9422720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            // New camping sites
            { name: 'Yosemite National Park', lat: 37.8651, lon: -119.5383, type: 'Camping Site', image: 'https://images.pexels.com/photos/144251/yosemite-national-park-landscape-california-144251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { name: 'Banff National Park', lat: 51.4968, lon: -115.9281, type: 'Camping Site', image: 'https://images.pexels.com/photos/1592461/pexels-photo-1592461.jpeg' },
            { name: 'Lake District', lat: 54.4609, lon: -3.0886, type: 'Camping Site', image: 'https://images.pexels.com/photos/18326865/pexels-photo-18326865/free-photo-of-stream-and-lake-among-hills.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            // New hill stations
            { name: 'Darjeeling', lat: 27.0410, lon: 88.2663, type: 'Hill Station', image: 'https://www.holidaymonk.com/wp-content/uploads/2021/07/Darjeeling-1536x959.jpg' },
            { name: 'Shimla', lat: 31.1048, lon: 77.1734, type: 'Hill Station', image: 'https://www.jakhuropewayshimla.com/blog/wp-content/uploads/2022/01/1944_3_7500.jpg' },
            { name: 'Munnar', lat: 10.0889, lon: 77.0595, type: 'Hill Station', image: 'https://images.pexels.com/photos/1065753/pexels-photo-1065753.jpeg?auto=compress&cs=tinysrgb&w=600' },
            // Monsoon destinations
            { name: 'Kerala', lat: 10.8505, lon: 76.2711, type: 'Monsoon Destination', image: 'https://images.pexels.com/photos/15065628/pexels-photo-15065628/free-photo-of-view-of-passenger-ships-on-a-body-of-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { name: 'Meghalaya', lat: 25.4670, lon: 91.3662, type: 'Monsoon Destination', image: 'https://images.pexels.com/photos/10024063/pexels-photo-10024063.jpeg?auto=compress&cs=tinysrgb&w=600' },
            { name: 'Goa', lat: 15.2993, lon: 74.1240, type: 'Monsoon Destination', image: 'https://images.pexels.com/photos/28368718/pexels-photo-28368718/free-photo-of-goa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            // Nature spots
            { name: 'Amazon Rainforest', lat: -3.4653, lon: -62.2159, type: 'Nature', image: '' },
            { name: 'Great Barrier Reef', lat: -18.2871, lon: 147.6992, type: 'Nature', image: 'https://images.pexels.com/photos/7777601/pexels-photo-7777601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { name: 'Plitvice Lakes National Park', lat: 44.8654, lon: 15.5820, type: 'Nature', image: 'https://images.pexels.com/photos/4191791/pexels-photo-4191791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
        ];

        touristPlaces.forEach(place => {
            const marker = L.marker([place.lat, place.lon]);
            
            const popupContent = `
                <div class="place-popup">
                    <img src="${place.image}" alt="${place.name}">
                    <h3>${place.name}</h3>
                    <p>${place.type}</p>
                    <button class="learn-more-btn">Learn More</button>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            markers.addLayer(marker);
        
            marker.on('click', function() {
                const popup = this.getPopup();
                const learnMoreBtn = popup._contentNode.querySelector('.learn-more-btn');
                learnMoreBtn.addEventListener('click', function() {
                    showPlaceDetails(place);
                });
            });
        });
        

      map.addLayer(markers);
    }
        
        function showPlaceDetails(place) {
            const detailsContainer = document.createElement('div');
            detailsContainer.className = 'place-details';
            detailsContainer.innerHTML = `
            <span class="close-info">&times;</span>
                <h2>${place.name}</h2>
                <p><strong>Type:</strong> ${place.type}</p>
                <p><strong>Location:</strong> Latitude ${place.lat}, Longitude ${place.lon}</p>
                <p>${getPlaceDescription(place.name, place.type)}</p>
            `;
        
            const existingDetails = document.querySelector('.place-details');
            if (existingDetails) {
                existingDetails.remove();
            }
            document.querySelector('#place-info').appendChild(detailsContainer);
            document.querySelector('#place-info').style.display = 'block';
        
            document.querySelector('.modal-content').appendChild(detailsContainer);
            const closeInfoBtn = detailsContainer.querySelector('.close-info');
            closeInfoBtn.addEventListener('click', function() {
                detailsContainer.remove();
            });
        }

       

      // Add custom control for centering the map
      L.Control.Center = L.Control.extend({
        onAdd: function(map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
            container.style.backgroundColor = 'white';
            container.style.width = '30px';
            container.style.height = '30px';
            container.innerHTML = '<i class="fas fa-compress-arrows-alt" style="line-height: 30px; margin-left: 8px;"></i>';
            container.title = 'Center Map';

            container.onclick = function(){
                map.setView([20, 0], 2);
            }
            return container;
        }
    });
    L.control.center = function(opts) {
        return new L.Control.Center(opts);
    }
    L.control.center({ position: 'topleft' }).addTo(map);

       
// Function to get place descriptions
function getPlaceDescription(name, type) {
    const descriptions = {
        'Eiffel Tower': "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.",
        'Machu Picchu': "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it's renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, intriguing buildings that play on astronomical alignments and panoramic views.",
        'Great Wall of China': "The Great Wall of China is a series of fortifications and walls built across the historical northern borders of ancient Chinese states and Imperial China as protection against nomadic invasions from the Eurasian Steppe.",
        'Taj Mahal': "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal.",
        'Grand Canyon': "The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles long, up to 18 miles wide and attains a depth of over a mile.",
        'Santorini': "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater).",
        'Angkor Wat': "Angkor Wat is a temple complex in Cambodia and is the largest religious monument in the world, on a site measuring 162.6 hectares. Originally constructed as a Hindu temple dedicated to the god Vishnu for the Khmer Empire, it was gradually transformed into a Buddhist temple towards the end of the 12th century.",
        'Bora Bora': "Bora Bora is a small South Pacific island northwest of Tahiti in French Polynesia. Surrounded by sand-fringed motus (islets) and a turquoise lagoon protected by a coral reef, it's known for its scuba diving.",
        'Petra': "Petra is a famous archaeological site in Jordan's southwestern desert. Dating to around 300 B.C., it was the capital of the Nabatean Kingdom. Accessed via a narrow canyon called Al Siq, it contains tombs and temples carved into pink sandstone cliffs, earning its nickname, the 'Rose City.'",
        'Yellowstone National Park': "Yellowstone National Park is a nearly 3,500-sq.-mile wilderness recreation area atop a volcanic hot spot. Mostly in Wyoming, the park spreads into parts of Montana and Idaho too. Yellowstone features dramatic canyons, alpine rivers, lush forests, hot springs and gushing geysers, including its most famous, Old Faithful.",
        'Yosemite National Park': "Yosemite National Park is in California's Sierra Nevada mountains. It's famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome.",
        'Banff National Park': "Banff National Park is Canada's oldest national park, established in 1885. Located in Alberta's Rocky Mountains, 110–180 kilometres west of Calgary, Banff encompasses 6,641 square kilometres of mountainous terrain, with numerous glaciers and ice fields, dense coniferous forest, and alpine landscapes.",
        'Lake District': "The Lake District, also known as the Lakes or Lakeland, is a mountainous region in North West England. A popular holiday destination, it is famous for its lakes, forests and mountains (or fells) and its associations with the early 19th century writings of William Wordsworth and the other Lake Poets.",
        'Darjeeling': "Darjeeling is a town in India's West Bengal state, in the Himalayan foothills. Once a summer resort for the British Raj elite, it remains the terminus of the narrow-gauge Darjeeling Himalayan Railway, or 'Toy Train,' completed in 1881. It's famed for the distinctive black tea grown on plantations that dot its surrounding slopes.",
        'Shimla': "Shimla is the capital of the northern Indian state of Himachal Pradesh, in the Himalayan foothills. Once the summer capital of British India, it remains the terminus of the narrow-gauge Kalka-Shimla Railway, completed in 1903. It's also known for the handicraft shops that line The Mall, a pedestrian avenue, as well as the Lakkar Bazaar, a market specializing in wooden toys and crafts.",
        'Munnar': "Munnar is a town in the Western Ghats mountain range in India's Kerala state. A hill station and former resort for the British Raj elite, it's surrounded by rolling hills dotted with tea plantations established in the late 19th century. Eravikulam National Park, a habitat for the endangered mountain goat Nilgiri tahr, is home to the Lakkam Waterfalls, hiking trails and 2,695m-tall Anamudi Peak.",
        'Kerala': "Kerala, a state on India's tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline. It's known for its palm-lined beaches and backwaters, a network of canals. Inland are the Western Ghats, mountains whose slopes support tea, coffee and spice plantations as well as wildlife. National parks like Eravikulam and Periyar, plus Wayanad and other sanctuaries, are home to elephants, langur monkeys and tigers.",
        'Meghalaya': "Meghalaya is a state in northeast India. The name means 'the abode of clouds' in Sanskrit. The state is bounded to the south by the Bangladeshi divisions of Mymensingh and Sylhet, to the west by the Bangladeshi division of Rangpur, and to the north and east by India's State of Assam.",
        'Goa': "Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony prior to 1961 is evident in its preserved 17th-century churches and the area's tropical spice plantations. Goa is also known for its beaches, ranging from popular stretches at Baga and Palolem to those in laid-back fishing villages such as Agonda.",
        'Amazon Rainforest': "The Amazon rainforest, covering much of northwestern Brazil and extending into Colombia, Peru and other South American countries, is the world's largest tropical rainforest, famed for its biodiversity. It's crisscrossed by thousands of rivers, including the powerful Amazon.",
        'Great Barrier Reef':"The Great Barrier Reef is the world's largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres over an area of approximately 344,400 square kilometres. The reef is located in the Coral Sea, off the coast of Queensland, Australia.",
        'Plitvice Lakes National Park': "Plitvice Lakes National Park is a 295-sq.-km forest reserve in central Croatia. It's known for a chain of 16 terraced lakes, joined by waterfalls, that extend into a limestone canyon. Walkways and hiking trails wind around and across the water, and an electric boat links the 12 upper and 4 lower lakes. The latter are the site of Veliki Slap, a 78m-high waterfall."
    };

    return descriptions[name] || `${name} is a beautiful ${type.toLowerCase()} destination. It offers stunning views and unique experiences for travelers.`;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Event listener for the explore button
document.getElementById('explore-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('map-modal').style.display = 'block';
    initMap();
});

// Close the modal when clicking the close button or outside the modal
document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('map-modal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('map-modal')) {
        document.getElementById('map-modal').style.display = 'none';
    }
}
//booking
        
        







