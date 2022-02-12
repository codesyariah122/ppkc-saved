<template>
	<div :class="`${$device.isDesktop ? 'event__detail mb-5' : 'event__detail'}`">
		<mdb-container>
			<!-- Event detail content -->
			<mdb-row class="row event__detail-content">
				<mdb-col lg="12">
					<mdb-row>

						<!-- <pre>
							{{events}}	
						</pre> -->

						<mdb-col md="3" sm="12" xs="12" class="col-1">
							<img :src="events.kegiatan.photo" class="rounded">
						</mdb-col>

						<mdb-col md="9" sm="12" xs="12" col="12" class="col-2">
							<h1>
								{{events.kegiatan.kegiatan_title}}
							</h1>
							<h4 class="mt-3">
								{{events.kegiatan.harga ? $format(events.kegiatan.harga) : 'Rp. -'}}
							</h4>

							<mdb-row class="inside__first mt-3">
								<mdb-col md="4">
									<h5>Jenis kegiatan</h5>
									<p>
										{{events.kegiatan.kegiatan_value}}
									</p>
								</mdb-col>
								<mdb-col md="4">
									<h5>Nilai SKP</h5>
									<p>
										{{events.kegiatan.nomor_skp ? events.kegiatan.nomor_skp : '-'}}
									</p>
								</mdb-col>
								<mdb-col md="12">
									<h5>Deskripsi</h5>
									<p>
										{{events.kegiatan.kegiatan_desc}}
									</p>
								</mdb-col>
								<mdb-col md="12">
									<h5>Waktu</h5>
									<p>
										{{$moment(events.kegiatan.tanggal_awal).format("LL")}} - {{$moment(events.kegiatan.tanggal_akhir).format("LL")}}
									</p>
								</mdb-col>
							</mdb-row>

							<mdb-row class="inside__second mt-3">

								<mdb-col v-if="status_pendaftaran == 'Daftar'" md="4">
									<div v-if="loading">
										<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
										Loading...
									</div>
									<div v-else>
										<mdb-btn @click="RegistrasiEvent(events.kegiatan.kegiatan_id)" color="primary" size="md" class="my__btn-primary">
											{{status_pendaftaran}}
										</mdb-btn>
									</div>
								</mdb-col>

								<mdb-col v-else-if="status_pendaftaran == 'Menunggu Konfirmasi'">
									<mdb-btn @click="RegistrasiEvent(events.kegiatan.kegiatan_id)" disabled color="info"size="md"> 
										<mdb-icon icon="check" /> {{status_pendaftaran}}
									</mdb-btn>
								</mdb-col>

								<mdb-col v-else>
									<mdb-btn v-if="data_event || token.accessToken" color="success" size="md" disabled>
										<mdb-icon far icon="calendar-check" /> {{status_pendaftaran}}
									</mdb-btn>
									<mdb-btn v-else size="md" color="grey" disabled class="mb-3 not__allowed">Daftar</mdb-btn>
								</mdb-col>

								<!-- <mdb-col v-else md="8">
									<p v-if="!token.accessToken">
										Silahkan masuk untuk mendaftar pelatihan ini <br>
										<a @click="SetEventLogin(events)" class="text-primary">Masuk Sekarang</a>
									</p>
								</mdb-col> -->
							</mdb-row>

						</mdb-col>
					</mdb-row>
				</mdb-col>
			</mdb-row>

			<!-- <pre>
				{{data_event}}
			</pre> -->

			<!-- Event profile setelah login -->
			<mdb-row v-if="token.accessToken" class="row justify-content-center event__detail-profile">
				<mdb-col v-if="events" lg="12" xs="12" sm="12">
					<div v-if="$device.isDesktop">
						<ProfilepageEventAktif :token="token" :api_url="api_url" :events="events" :status_pendaftaran="status_pendaftaran"/>
					</div>
					<div v-else>
						<mdb-alert color="warning" v-if="p1" @closeAlert="p1=false" dismiss>
							<strong>Ooppss !</strong> Untuk menampilkan konten ini anda harus membuka nya di komputer/PC - Laptop.
						</mdb-alert>
					</div>
				</mdb-col>
			</mdb-row>

			<!-- List Event lainnya -->
			<mdb-row v-else class="row justify-content-center event__detail-list">		
				<mdb-col lg="12" xs="12" sm="12">
					<h4>Event Lainnya</h4>
				</mdb-col>

				<!-- Pagination option components & info -->
				<mdb-pagination v-if="lists.length > 1" color="blue" md class="mt-3">
					<b-pagination 
					v-model="currentPage"
					:total-rows="lists.length"
					:per-page="listToShow"
					@change="LoadEvent" aria-controls="show-event" align="center"></b-pagination>
				</mdb-pagination>

				<mdb-col lg="12" xs="12" sm="12" class="mt-3 mb-5">
					<mdb-badge pill color="light-blue">
						Page: {{currentPage}}
					</mdb-badge>
				</mdb-col>
				<!-- End paginationn -->

				<mdb-col v-if="loading" lg="12" xs="12" sm="12">
					<div class="d-flex justify-content-center">
						<div class="spinner-grow text-primary" role="status" style="width: 3rem; height: 3rem;">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				</mdb-col>

				<mdb-col v-else lg="12" xs="12" sm="12">
					<div class="card__list">
						<!-- List event inside global-components -->
						<GlobalsListEvent :lists="lists" :listToShow="listToShow" :token="token" :data_event="data_event" @registrasi-event="RegistrasiEvent"/>
					</div>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	import {FetchData} from '@/helpers'

	export default{
		name: 'detail-event-id-slug',
		layout: 'default',
		data(){
			return {
				lists: [],
				listToShow: 3,
				loading:null,
				currentPage: 1,
				status_pendaftaran: '',
				id: this.$route.params.id,
				p1: true
			}
		},

		async asyncData({$axios, params}){
			const events =  await $axios.$get(`/web/event/no-auth/${params.id}`)
			
			return {
				events,
			}
		},

		beforeMount(){
			this.GetEventDataLogin(),
			this.ConfigApiUrl(),
			this.CheckToken()
		},

		mounted(){
			this.ListEvent(0, '', '', ''),
			this.StatusPembayaran()
		},

		methods: {
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			ConfigApiUrl(){
				const url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', url)
			},

			ListEvent(page, category, month, keyword){
				if(this.token.accessToken){					
					this.loading=true

					const url = `${this.api_url}/web/event/page?jenis_pelatihan=${category ? category : ''}&bulan_pelatihan=${month ? month : ''}&start=${page ? page : 0}&keyword=${keyword ? keyword : ''}`

					FetchData(url)
					.then((res) => {
						this.lists = res.map(d => {
							d.list_kegiatan_terdekat.filter(d => d.id != this.id)
						})
						console.log(this.lists)
					})
					.catch((err) => {
						console.log(err.response)
					})
					.finally(() => {
						setTimeout(() => {
							this.loading=false
						}, 1000)
					})
				}
			},

			LoadEvent(page){
				if(page == 1){
					page = 0
				}
				this.ListEvent(page, '', '', '')
			},

			SetEventLogin(data){
				this.$store.dispatch('config/setEventToLogin', JSON.stringify(data))
				this.$router.push({
					name: 'auth-login'
				})
			},

			GetEventDataLogin(){
				this.$store.dispatch('config/getEventDataToLogin', 'event')
			},

			RegistrasiEvent(id){
				this.$router.push({
					name: 'events-id-registrasi',
					params: {
						id: id
					}
				})
			},

			StatusPembayaran(){
				if(this.token.accessToken){
					const url = `${this.api_url}/web/event/${this.$route.params.id}`
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.status_pendaftaran = data.kegiatan.status_pendaftaran_value
					})
					.catch(err => console.log(err))
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
			set_event(){
				return this.$store.getters['config/ConfigSetEventLogin']
			},
			data_event(){
				return this.$store.getters['config/ConfigEventDataLogin']
			}
		}

	}
</script>