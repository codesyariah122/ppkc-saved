<template>
	<div class="auth__content">
		<mdb-container>

			<mdb-row class="justify-content-center registrasi__event-header">
				<mdb-col lg="12" sm="12" xs="12">
					<EventpageKonfirmasiHeader/>
				</mdb-col>
			</mdb-row>


			<mdb-row class="row justify-content-center registrasi__event-content">
				<mdb-col md="6" sm="8" xs="8">
					<EventpageKonfirmasi :id="id" :kegiatan="kegiatan" :bank="bank" :loading="loading" :token="token" :api_url="api_url"/>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>
<script>
	export default {
		name: 'events-id-konfirmasi',
		layout: 'profile',

		data(){
			return {
				loading: null,
				id: this.$route.params.id,
				kegiatan: {},
				bank: {}
			}
		},

		beforeMount(){
			this.ConfigApiUrl(),
			this.CheckToken()
		},

		mounted(){
			this.CheckPembayaran()
		},

		methods:{
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},
			ConfigApiUrl(){
				const api_url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', api_url)
			},

			CheckPembayaran(){
				this.loading = true
				const url = `${this.api_url}/web/event/${this.id}/konfirmasi`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(url)
				.then(({data}) => {
					this.kegiatan = data.kegiatan
					this.bank = data.bank
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.loading = false
				})
			}
		},

		computed: {
			token(){
				return this.$store.getters['config/ConfigCheckLogin']
			},
			api_url(){
				return this.$store.getters['config/ConfigApiUrl']
			}
		}
	}
</script>