<template>
	<div>
		<mdb-row class="d-flex justify-content-start" col="12">
			<mdb-col md="3">
				<h4> {{time}} </h4>
			</mdb-col>
			
			<mdb-col v-if="apiKey" md="6" class="weather">
				<mdb-badge color="light-blue" class="rounded-pill">
					{{city.city}}<img :src="`http://openweathermap.org/img/wn/${weathers.icon}@2x.png`"> {{weathers.description}} {{temp}}&#8451;
				</mdb-badge>
			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	// Time Docs : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
	import {FetchData, CheckWeather} from '@/helpers'
	export default {
		data() {
			return {
				interval: null,
				time: null,
				ip:'',
				city: localStorage.getItem('your-city') ? JSON.parse(localStorage.getItem('your-city')) : '',
				apiKey: process.env.NUXT_ENV_WEATHER_KEY ? process.env.NUXT_ENV_WEATHER_KEY : '',
				temp:'',
				weathers: [],
				fdays:  []
			}
		},

		beforeMount(){
			this.YourIp(),
			this.YourCity()
		},
		beforeDestroy() {
			clearInterval(this.interval)
		},
		created() {
			this.interval = setInterval(() => {
				this.time = Intl.DateTimeFormat(['id'], {
					weekday: "long",
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric'
				}).format()
			}, 1000)
		},

		mounted(){
			this.WeatherByCity()
		},

		methods: {
			YourIp(){
				const url = 'https://api.ipify.org/?format=json'
				FetchData(url)
				.then(res => {
					this.ip = res.ip
				})
				.catch(err => console.log(err))
			},

			YourCity(){
				const url = `https://ipapi.co/${this.ip}/json/`
				FetchData(url)
				.then(res => {
					localStorage.setItem('your-city', JSON.stringify({
						city: res.city
					}))
				})
				.catch(err => console.log(err))
			},

			// convert celcius
			getCelcius(num){
				num = parseFloat(num)
				return Math.ceil((num - 32) / 1.8)
			},

			WeatherByCity(){
				CheckWeather(this.city.city, this.apiKey)
				.then(res => {
					this.weathers = res.weather[0]
					this.temp = this.getCelcius(res.main.temp)
				})
				.catch(err => console.log(err))
			}
		}
	}

</script>

<style lang="scss">
	.weather{
		margin-bottom: 1rem;
		img{
			width: 35px;
		}
	}
	@media (min-width: 992px) {
		.glow {
			color: #fff;
			text-shadow:
			0 0 7px #fff,
			0 0 10px #fff,
			0 0 21px #fff,
			0 0 42px #0fa,
			0 0 82px #0fa,
			0 0 92px #0fa,
			0 0 102px #0fa,
			0 0 151px #0fa;
		}
		.weather{
			margin-top: -1rem!important;
			margin-left: -2rem;
			.badge{
				img{
					width: 45px;
				}
			}
		}
	}
</style>