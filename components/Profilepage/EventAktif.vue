<template>
	<div>
		<hr class="mt-5">
		<mdb-container  v-if="status_pendaftaran !== 'Menunggu Konfirmasi' &&status_pendaftaran !== 'Daftar'" :class="`${$device.isDesktop ? 'mt-5' : ''}`">
			<mdb-row class="justify-content-center mt-2 mb-5">
				<mdb-col lg="12" col="12">
					<mdb-tooltip trigger="hover" :options="{placement: 'top'}">
						<span slot="tip"> Kembali ke halaman profile</span>
						<nuxt-link :to="`/profile/${profiles}`" class="btn__tooltip" slot="reference">
							<mdb-icon icon="arrow-left" />
							Kembali ke profile
						</nuxt-link>
					</mdb-tooltip>
				</mdb-col>
			</mdb-row>

			<!-- Detail pelatihan boxed -->
			<mdb-row class="no-gutters pelatihan__box">
				<mdb-col col="4" md="4" class="nav__event-pelatihan">
					<div v-for="(item, index) in pelatihans" :key="item.id">
						<b-button v-b-toggle="`collapse-${item.id}`" class="btn__pelatihan" @click="ToggleFile">
							<mdb-row class="row justify-content-between">
								<mdb-col md="6">	
									Pelatihan {{item.id}} 
								</mdb-col>
								<mdb-col md="2">
									<mdb-icon icon="plus" size="lg"/>
								</mdb-col>
							</mdb-row>
						</b-button>


						<b-collapse :id="`collapse-${item.id}`" class="collapse__category-event-1">
							<div v-for="(c, index) in item.categories"  :key="c.id">
								<b-button v-b-toggle="`collapse-${c.id}-inner`" size="sm" class="btn__category-1" @click="ToggleFile">
									<mdb-row class="row justify-content-between">
										<mdb-col md="6">
											Kategori {{index+1}}
										</mdb-col>
										<mdb-col md="2">
											<mdb-icon icon="caret-down" size="lg"/>
										</mdb-col>
									</mdb-row>
								</b-button>

								<b-collapse :id="`collapse-${c.id}-inner`" class="collapse__category-event-2 mb-5">
									<div v-for="(d, index) in c.details" :key="d.id" class="list__modul">
										<mdb-btn v-b-toggle="`collapse-${d.id}-pelatihan`" size="sm" class="btn__category-2" @click="ToggleFile">
											<mdb-row class="row justify-content-between">
												<mdb-col md="6">
													{{d.title}}
												</mdb-col>
												<mdb-col md="2">
													<mdb-icon icon="caret-down" size="lg"/>
												</mdb-col>
											</mdb-row>
										</mdb-btn>

										<b-collapse :id="`collapse-${d.id}-pelatihan`" class="collapse__category-event-3">
											<b-card>
												<b-list-group class="list__modul">
													<b-list-group-item >
														<a v-if="d.kategori == 1" href="#!" @click="ShowField(d, 'video', d.kategori)">
															<mdb-icon icon="video" /> Video
														</a>

														<a v-else-if="d.kategori == 2" href="#!" @click="ShowField(d, 'file_pdf', d.kategori)">
															<mdb-icon far icon="file-pdf" /> Materi PDF
														</a>

														<a v-else-if="d.kategori == 3" href="#!" @click="ShowField(d, 'file_pdf', d.kategori)">
															<mdb-icon far icon="file-alt" /> Pre Test
														</a>

														<a v-else-if="d.kategori == 4" href="#!" @click="ShowField(d, 'file_pdf', d.kategori)">
															<mdb-icon icon="file-signature" /> Post Test
														</a>

														<a v-else-if="d.kategori == 5" href="#!" @click="ShowField(d, 'file_pdf', d.kategori)">
															<mdb-icon icon="file-signature" /> Informed Consent
														</a>

														<a v-else-if="d.kategori == 6" href="#!" @click="ShowField(d, 'video', d.kategori)">
															<mdb-icon far icon="file-video" /> Webinar
														</a>

													</b-list-group-item>
												</b-list-group>
											</b-card>
										</b-collapse>

									</div>
								</b-collapse>
							</div>
						</b-collapse>
					</div>
				</mdb-col>

				<mdb-col col="8" md="8" class="content__event-pelatihan mt-3">
					<div v-if="loading" class="mt-5">
						<div class="text-center">
							<div class="spinner-grow text-primary" style="width: 5rem; height: 5rem;" role="status">
								<span class="sr-only">Loading...</span>
							</div>
						</div>
					</div>
					<div v-else>
						<div v-if="show_file">
							<div v-if="detailed.file_pdf == 'https://api.ppkc-online.com/file-pelatihan/null'">
								<mdb-alert color="danger">
									File not found
								</mdb-alert>
							</div>
							<object v-if="detailed.file_pdf" :data="detailed.file_pdf" type="application/pdf" width="90%" :height="`${$device.isDesktop ? '800px' : '500px'}`">
							</object>
							<div v-else-if="detailed.video" class="embed__video">
								<b-embed
								type="iframe"
								aspect="16by9"
								:src="detailed.video"
								allowfullscreen
								></b-embed>
							</div>
							<div v-else>
								<mdb-alert color="danger" class="text-center">
									File tidak tersedia
								</mdb-alert>
							</div>
						</div>
					</div>
				</mdb-col>
			</mdb-row>
		</mdb-container>
		
		<!-- debuging -->
		<!-- <pre class="mt-5">
			{{pelatihans.map(c => {
				return c.categories
			})}}
		</pre> -->
	</div>
</template>


<script>
	export default{
		props: ['token', 'api_url', 'events', 'status_pendaftaran'],

		data(){
			return {
				loading: null,
				profiles: [],
				pelatihans: [],
				categories:[],
				detailed: '',
				type: '',
				title: this.events.kegiatan.kegiatan_title,
				tgl: '',
				start: '',
				end: '',
				show_file:false,
				show_collapse: true,
				lists: [
					{id:1, name: 'Modul 1', icon: 'copy', field: 'file_pdf'},
					{id:2, name: 'Modul 2', icon: 'file-alt', field: 'file_pdf'},
					{id:3, name: 'Video Pembelajaran 1', icon: 'play-circle', field: 'video'},
					{id:4, name: 'Webinar 1', icon: 'file-video'},
					{id:5, name: 'Test Akhir', icon: 'edit', field: 'file_pdf'}
				]
			}
		},

		mounted(){
			this.EventAktif(),
			this.UserProfileData()
		},

		methods: {
			// Event Aktif Yang Diikuti
			EventAktif(){
				this.loading = true
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(`${this.api_url}/web/event/${this.$route.params.id}`)
				.then(({data}) => {
					// console.log(data)
					this.pelatihans = data.pelatihans
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.loading=false
				}, 900)
			},

			ShowCategory(id, detail_id){
				// console.log(id)
				const filter = this.pelatihans.filter(d => d.id == id)
				// console.log(filter)
				this.show_categories=true
				this.categories = filter.map(c => {
					return c.categories.filter(f => f.pelatihan_id == id)
				})
			},

			ShowField(raw, field, type){
				// console.log(type)
				this.loading = true
				this.show_file = true
				this.detailed = ''
				this.detailed = Object.keys(raw)
				.filter(key => field.includes(key))
				.reduce((obj, key) => {
					obj[key] = raw[key];
					return obj;
				}, {});

				this.type = type

				setTimeout(() => {
					this.loading = false
				}, 900)

				console.log(this.detailed);
			},

			UserProfileData(){
				if(this.token){					
					const url = `${this.api_url}/web/user`
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.profiles = this.$username(data.user.nama)
					})
					.catch(err => console.log(err.response ? err.response : ''))
				}
			},

			ToggleFile(){
				if(this.show_file){
					this.show_file = false
				}
				// console.log(this.show_file)
			}
		}
	}
</script>
