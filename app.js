Vue.config.devtools = true;


Vue.component('top-header', {
  template: '<h1>Weather App</h1>'
})
var app = new Vue({
  el: '#app', 
  data () {
    return {
      name: '',
      info: '',
    //   country: '',
      temp: '',
      
      city: ''
    }
  },
  
	mounted() {
    
		navigator.geolocation.getCurrentPosition(pos => {
      
			console.log('got coordinates', pos.coords);
			this.lat = pos.coords.latitude;
      this.lon = pos.coords.longitude;
      this.loadWeather();
		})

	},
	methods:{
		loadWeather() {
    axios 
     .get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=375b5b72defecfdfccfa090d50f49db4`)
     .then(response => (this.info = response.data))
     .catch(error => {
      alert('Error! Something went wrong.')
    })
    },
    loadCity() {
      var that=this;
      var city=this.city;
      axios
      .get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=375b5b72defecfdfccfa090d50f49db4')
      .then(response => (this.info = response.data))
      .catch(error => {
        alert('Unknown city, please try a different city or check your typing')
      })
    }
  }
})