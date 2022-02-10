<template>
	<div class="auth__content">
		<mdb-container>
			<mdb-row class="row justify-content-center">
				<mdb-col md="6" sm="8" xs="8">

					<!-- <pre>
						{{profiles }}
					</pre> -->

					<AuthpageLoginCard @login-profile="Login" :validation="validation" :show_alert="show_alert" :loading="loading" ref="AuthLogin" :event_data="event_data"/>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	import {LoginProfile} from '@/helpers'

	export default{
		name: 'auth-login',
		layout: 'auth',

		data(){
			return {
				validation:{},
				show_alert: null,
				profiles:[],
				username: '',
				loading: null
			}
		},

		beforeMount(){
			this.ConfigApiUrl(),
			this.CheckToken()
		},

		mounted(){
			this.EventDataLogin(),
			this.UserProfileData(),
			this.IsLoggedIn()
		},

		methods: {
			IsLoggedIn(){
				if(this.token.accessToken){
					this.Alert('success', `Anda sedang login`)
					setTimeout(() => {
						this.$router.push({
							name: 'profile-slug',
							params: {
								slug: this.username
							}
						})
					}, 900)
				}
			},

			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			UserProfileData(){
				if(this.token){					
					const url = `${this.api_url}/web/user`
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.profiles = data.user
						this.username = this.$username(data.user.nama)
					})
					.catch(err => console.log(err.response ? err.response : ''))
				}
			},

			Login(params){
				this.loading = true
				const url = `${this.api_url}/web/auth/login`
				const event_id = this.event_data.kegiatan ? this.event_data.kegiatan.kegiatan_id : false
				const event_slug = this.event_data.kegiatan ? this.$slug(this.event_data.kegiatan.kegiatan_title) : false
				// Method from helpers
				LoginProfile(url, params)
				.then((res) => {
					if(res.message){
						this.Alert('error', res.message)
						this.show_alert = true
						this.validation = res.message
					}
					const alert_data = `Halo, Selamat Datang ${res.user.nama}, Login berhasil !`
					this.Alert('success', alert_data)

					// store access token
					this.ConfigAuthLogin(JSON.stringify(res.token))

					// assignment
					this.profiles = res.user

					// redirect
					if(event_id){
						// console.log("ok send event")
						this.$router.push({
							name: 'detail-event-id-slug',
							params: {
								id:  event_id,
								slug: event_slug
							}
						})
					}else{
						// console.log("no event data")
						this.$router.push({
							name: 'profile-slug',
							params: {
								slug: this.$username(this.profiles.nama)
							}
						})
					}

				})
				.catch(err => console.log(err))
				.finally(() => {
					setTimeout(() => {
						this.loading=false
					}, 900)
				})
			},

			Alert(status, data){
				switch(status){
					case 'error':
					return this.$swal({
						icon: status,
						title: 'Oops...',
						text: data,
					})
					break;
					case 'success':
					return this.$swal({
						position: 'top-end',
						icon: status,
						title: data,
						showConfirmButton: false,
						timer: 1500
					})
					break;
				}
				
			},

			ConfigApiUrl(){
				const api_url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', api_url)
			},

			ConfigAuthLogin(data){
				this.$store.dispatch('config/storeConfigAuth', data)
			},

			EventDataLogin(){
				this.$store.dispatch('config/getEventDataToLogin', 'event')
			}
		},

		computed:{
			api_url(){
				return this.$store.getters['config/ConfigApiUrl']
			},
			auth_token(){
				return this.$store.getters['config/ConfigAuthLogin']
			},
			event_data(){
				return this.$store.getters['config/ConfigEventDataLogin']
			},
			token(){
				return this.$store.getters['config/ConfigCheckLogin']
			},
		}
	}
</script>