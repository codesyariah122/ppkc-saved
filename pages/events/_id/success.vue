<template>
	<div>
		<mdb-container class="pembayaran__success">
			<mdb-row class="d-flex justify-content-center">

				<mdb-col lg="12">
					<center>
						<img :src="checks.data.bukti_bayar" alt="Image" class="rounded-0" width="300">
					</center>
				</mdb-col>
				
				<mdb-col lg="6" class="mt-3">
					<mdb-alert color="success">
						{{checks.message}}
					</mdb-alert>
				</mdb-col>

				<mdb-col lg="8" class="mt-2">
					<center>
						<nuxt-link :to="`/detail/event/${id}/${$slug(your_events.kegiatan_title ? your_events.kegiatan_title : '')}`" color="primary" class="btn btn-primary"><mdb-icon icon="arrow-left" /> Selesai </nuxt-link>
					</center>
				</mdb-col>
				
			</mdb-row>
		</mdb-container>
	</div>
</template>

<style lang="scss">
.pembayaran__success{
	margin-top: 5rem;
}
</style>

<script>
	export default {
		name: 'events-id-success',
		layout: 'default',
		data(){
			return {
				id: this.$route.params.id,
				checks: localStorage.getItem("success") ? JSON.parse(localStorage.getItem("success")) : '',
				your_events: {}
			}
		},

		mounted(){
			this.GoYourEvent(),
			this.IsLoggedIn()
		},

		methods: {
			IsLoggedIn(){
				if(!this.token.accessToken){
					this.Alert('error', `Anda tidak dapat izin untuk mengakses halaman ini`)
					setTimeout(() => {
						this.$router.push({
							path: `/detail/event/${this.$route.params.id}`
						})
					}, 900)
				}
			},
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			GoYourEvent(){
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(`${this.api_url}/web/event/${this.id}/daftar`)
				.then(({data}) => {
					this.your_events = data.kegiatan
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
			}
		},
		computed: {
			token(){
				return this.$store.getters['config/ConfigCheckLogin']
			},

			api_url(){
				return this.$store.getters['config/ConfigApiUrl']
			},
		}
	}
</script>