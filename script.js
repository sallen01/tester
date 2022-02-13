document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=bec0ffee3d531918df25fd5812c98108";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i = 0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      for (let i = 0; i < json.weather.length; i++) {
        results += "<p>" + json.weather[i].description + "</p>";
        if (i !== json.weather.length - 1)
          results += ", "
      }
      results += "<p>Sunset: " + moment(json.sys.sunset).format('h:mm a') + "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    })
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=bec0ffee3d531918df25fd5812c98108";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let forecast = "";
        for (let i = 0; i < json.list.length; i++) {
          forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do, h:mm a') + "</h2>";
          forecast += "<p>Temperature: " + json.list[i].main.temp + "&deg;F</p>";
          forecast += "<p>Feels like: " + json.list[i].main.feels_like + "&deg;F</p>";
          forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
          forecast += "<p>" + json.list[i].weather[0].description + "</p>";
          forecast += "<p>Wind: " + json.list[i].wind.speed + " mph</p>";
        }
        document.getElementById("forecastResults").innerHTML = forecast;
      })
});
