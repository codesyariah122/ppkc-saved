<template>
	<div>
		<hr class="mt-5">
		<mdb-container :class="`${$device.isDesktop ? 'mt-5' : ''}`">
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
						<b-button v-b-toggle="`collapse-${item.id}`" class="btn__pelatihan">
							<mdb-row class="row justify-content-between">
								<mdb-col md="6">	
									Pelatihan {{item.id}} 
								</mdb-col>
								<mdb-col md="2">
									<mdb-icon icon="plus" />
								</mdb-col>
							</mdb-row>
						</b-button>


						<b-collapse :id="`collapse-${item.id}`" class="collapse__category-event-1">
							<div v-for="(c, index) in item.categories"  :key="c.id">
								<b-button v-b-toggle="`collapse-${c.id}-inner`" size="sm" class="btn__category">Kategori {{index+1}}</b-button>
								<b-collapse :id="`collapse-${c.id}-inner`" class="collapse__category-event-2 mb-3">
									<b-card>
										<div v-for="(d, index) in c.details" :key="d.id" class="list__modul">
											<h5> {{d.title}} </h5>
											<b-list-group>
												<!-- <pre>
													{{d}}
												</pre> -->
												<b-list-group-item v-for="l in lists" :key="l.id">
													<a href="#!" @click="ShowField(d, l.field, l.type)">
														<mdb-icon far :icon="l.icon"/>	{{l.name}}
													</a>
												</b-list-group-item>
											</b-list-group>
										</div>
									</b-card>
								</b-collapse>
							</div>
						</b-collapse>
					</div>

				</mdb-col>



				<mdb-col col="8" md="8" class="content__event-pelatihan mt-3">
					<div v-if="show_file">
						<object v-if="detailed.file_pdf" :data="detailed.file_pdf" type="application/pdf" width="95%" :height="`${$device.isDesktop ? '800px' : '500px'}`">
						</object>

						<div v-if="detailed.video" class="embed__video">
							<!-- <b-embed
							type="iframe"
							aspect="16by9"
							:src="detailed.video"
							allowfullscreen
							></b-embed> -->
							<b-embed
							type="iframe"
							aspect="16by9"
							:src="detailed.video"
							allowfullscreen
							></b-embed>
						</div>
					</div>
				</mdb-col>
			</mdb-row>
		</mdb-container>
		



		<!-- debuging -->
		<!-- <pre class="mt-5">
			{{pelatihans.map(d => {
				return d.categories
			})}}
		</pre> -->
	</div>
</template>


<script>
	export default{
		props: ['token', 'api_url', 'events'],

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
				{id:1, name: 'Modul 1', icon: 'copy', field: 'file_pdf', type: 'File Materi'},
				{id:2, name: 'Modul 2', icon: 'file-alt', field: 'file_pdf', type: 'File Materi'},
				{id:3, name: 'Video Pembelajaran 1', icon: 'play-circle', field: 'video', type: 'Video Materi'},
				{id:4, name: 'Webinar 1', icon: 'file-video', field: 'video'},
				{id:5, name: 'Test Akhir', icon: 'edit', field: 'file_pdf', type: 'File Materi'}
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
				this.show_file = true
				this.detailed = ''
				this.detailed = Object.keys(raw)
				.filter(key => field.includes(key))
				.reduce((obj, key) => {
					obj[key] = raw[key];
					return obj;
				}, {});

				this.type = type

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
			}
		}
	}
</script>
