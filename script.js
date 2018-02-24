var key = "appid=bcfcb4887062b736e59529453432ed87";
var api = "http://api.openweathermap.org/data/2.5/weather?";
var units = "imperial";
var far;
var cel;
var temp;

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position){
		let lat = "lat=" + position.coords.latitude;
		let lon = "lon=" + position.coords.longitude;
		getWeatherData(lat, lon, units);
	});
}


function getWeatherData(lat, lon, units){
	$.getJSON(api + lat + "&" + lon + "&units=" + units + "&" + key, function(json){
		$('#location').html(json.name + ", " + json.sys.country);
		$('#temp').html(Math.round(json.main.temp) + "&#8457, ");
		setTemps(Math.round(json.main.temp));
		$('#weather').html(json.weather[0].description);
		var date =  new Date()
		if (date.getHours() < 7 || date.getHours() > 18){
			$('#icon').addClass("wu-night");
		}
		var id = json.weather[0].id;
		setIcon(id);				
	});
}

function setIcon(id){
	if (id < 203 || (id >= 230 && id <= 232)) $('#icon').addClass("wu-tstorms");
	else if (id < 230) $('#icon').addClass("wu-chancetstorms");
	else if (id <= 321) $('#icon').addClass("wu-chancerain");
	else if (id <= 531 && id != 511) $('#icon').addClass("wu-rain");
	else if (id == 511) $('#icon').addClass("wu-sleet");
	else if (id == 600) $('#icon').addClass("wu-chanceflurries");
	else if (id <= 602) $('#icon').addClass("wu-snow");
	else if (id <= 616) $('#icon').addClass("wu-sleet");
	else if (id == 620) $('#icon').addClass("wu-chanceflurries");
	else if (id <= 622) $('#icon').addClass("wu-snow");
	else if (id <= 741) $('#icon').addClass("wu-fog");
	else if (id == 800) $('#icon').addClass("wu-clear");
	else if (id <= 803) $('#icon').addClass("wu-partlycloudy");
	else if (id == 804) $('#icon').addClass("wu-cloudy");
	else $('#icon').addClass("wu-unknown");
}

function setTemps(value){
	far = value;
	cel = Math.round((value - 32) * 5 / 9);
	temp = value;
}



function changeUnits(){
	temp = temp == far ? cel : far;
	let degree = temp == far ? "&#8457" : "&#8451";
	$('#temp').html(temp + degree + ", ");
}
