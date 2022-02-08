<template>
	<div>
		<h1>Detail Pelatihan : </h1>
		<mdb-container>
			<mdb-btn v-for="(item, index) in pelatihans" color="primary" @click="ShowCategory(item.id)" :key="item.id">
				Pelatihan Sesi {{index+1}}
			</mdb-btn>

			<b-tabs v-if="show_categories" pills card vertical>
				<!-- <pre>
					{{categories}}
				</pre> -->
				<div v-for="ns in categories">
					<b-tab v-for="(item, index) in ns" :title="`Kategori ${item.urutan}`" active :key="item.id">
						<b-card-text>
							<!-- <pre>
								{{item.details}}
							</pre> -->
							<b-tabs pills card vertical class="mt-5">
								<b-tab v-for="(d, index) in item.details" :title="d.title" active :key="d.id">
									<b-card-text>
										<object v-if="d.file_pdf_original" :data="d.file_pdf" type="application/pdf" width="100%" height="500px">
										</object>

										<div v-if="d.video" class="embed-responsive embed-responsive-16by9 z-depth-1-half">
											<iframe class="embed-responsive-item" :src="d.video" allowfullscreen></iframe>
										</div>

									</b-card-text>
								</b-tab>
							</b-tabs>
						</b-card-text>
					</b-tab>
				</div>
			</b-tabs>
		</mdb-container>
		<!-- debuging -->
		<pre>
			{{pelatihans}}
		</pre>
	</div>
</template>


<script>
	export default{
		props: ['token', 'api_url', 'events'],

		data(){
			return {
				loading: null,
				pelatihans: [],
				categories:[],
				title: this.events.kegiatan.kegiatan_title,
				tgl: '',
				start: '',
				end: '',
				show_categories: null
			}
		},

		mounted(){
			this.EventAktif()
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

			ShowCategory(id){
				console.log(id)
				const filter = this.pelatihans.filter(d => d.id == id)
				this.show_categories=true
				this.categories = filter.map(d=>{
					return d.categories
				})
				console.log(this.categories)
			}
		}
	}
</script>
