const xmlHttpRequest = new XMLHttpRequest();
const API_KEY = '7821182585fafa634e6d1a7f1d986c75';
const city = 'Sapporo';
xmlHttpRequest.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // ifメモ *** readyState == 4 : 通信完了、status == 200 : リクエスト成功 ***
    if (this.response) {
      let weather = this.response.weather[0].description;
      console.log(weather);
      // 天気の結果に合わせて画像を出し分け
      switch (weather) {
        case 'clear sky':
          weather = '快晴', imgFilePath = clearSkyImg;
          break;
        case 'few clouds':
          weather = '晴れ', imgFilePath = fewCloudsImg;
          break;
        case 'scattered clouds':
          weather = '雲が多め', imgFilePath = scatteredCloudsImg;
          break;
        case 'broken clouds':
          weather = '曇天', imgFilePath = brokenCloudsImg;
          break;
        case 'overcast clouds':
          weather = '曇天', imgFilePath = brokenCloudsImg;
          break;
        case 'shower rain':
          weather = '小雨', imgFilePath = showerRainImg;
          break;
        case 'rain':
          weather = '雨', imgFilePath = rainImg;
          break;
        case 'thunderstorm':
          weather = '雷雨', imgFilePath = thunderstormImg;
          break;
        case 'snow':
          weather = '雪', imgFilePath = snowImg;
          break;
        case 'mist':
          weather = '霧', imgFilePath = mistImg;
          break;
      }
      const weatherData = (weather, imgFilePath) => {
        weatherImageObj.setAttribute("src", imgFilePath);
        weatherImageObj.setAttribute("alt", weather);
        weatherTextObj.textContent = weather;
      }
      weatherData(weather, imgFilePath);
      // 観測時刻を表示
      let observationTime = this.response.dt;
      const observationTimestamp = observationTime ? new Date(observationTime * 1000) : new Date();
      const observationTimeH = ('0' + observationTimestamp.getHours()).slice(-2);
      const observationTimeM = ('0' + observationTimestamp.getMinutes()).slice(-2);
      observationTime = observationTimeH + ':' + observationTimeM;
      console.log(observationTimestamp);
      console.log(observationTimeH);
      console.log(observationTimeM);
      console.log(observationTime);
      observationTimeObj.textContent = ('by' + ' ' + observationTime);
    }
  }
}
const weatherImageObj = document.getElementById('weatherImage'),
  weatherTextObj = document.getElementById('weatherText');
observationTimeObj = document.getElementById('observationTime');
const clearSkyImg = './images/clearSky.jpg',
  fewCloudsImg = './images/fewClouds.jpg',
  scatteredCloudsImg = './images/scatteredClouds.jpg',
  brokenCloudsImg = './images/brokenClouds.jpg',
  showerRainImg = './images/showerRain.jpg',
  rainImg = './images/rain.jpg',
  thunderstormImg = './images/thunderstorm.jpg',
  snowImg = './images/snow.jpg',
  mistImg = './images/mist.jpg';

xmlHttpRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',jp&units=metric&APPID=' + API_KEY, true);
xmlHttpRequest.responseType = 'json';
xmlHttpRequest.send(null);