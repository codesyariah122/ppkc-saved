<template>
	<article>
		<div class="container-fluid">
			<div class="row">
				<div class="col">
					<ProfilepageEventDashboardDetailEvent :details="details" :loading="loading" :status_pendaftaran="status_pendaftaran"/>
				</div>
			</div>
			<div :class="`row ${scrolledToBottom ? 'fixed-content': ''}`">
				<div class="col-4">

					<ProfilepageEventDashboardSidebar :profiles="profiles" :loading="loading" :username="username" :pelatihans="pelatihans" :scrolledToBottom="scrolledToBottom" @show-field="ShowField" @toggle-file="ToggleFile"/>

				</div>
				<div class="col-8">
					<div v-if="loading">
						<b-card>
							<b-skeleton animation="wave" width="85%"></b-skeleton>
							<b-skeleton animation="wave" width="55%"></b-skeleton>
							<b-skeleton animation="wave" width="70%"></b-skeleton>
						</b-card>
					</div>
					<div v-else class="content-section">
						<h2>Content Section</h2>
					</div>
				</div>
			</div>
		</div>
	</article>

</template>

<script>
	export default{
		name: 'profile-events-id-slug',
		layout: 'profile-event',

		data(){
			return {
				profiles: {},
				username: '',
				details: [],
				works: [],
				maritals: [],
				pelatihans:[],
				categories: [],
				status_pendaftaran: '',
				empty_filter: false,
				loading: null,
				show_file:false,
				pelatihans: [],
				kegiataan: [],
				categories:'',
				category_title: '',
				detailed_data: {},
				category_name: '',
				detailed: '',
				type: '',
				tgl: '',
				start: '',
				end: '',
				visible: true,
				show_file:false,
				id_test: '',
				id_webinar: '',
				type_name: '',
				show_close: false,
				scrolledToBottom:false,
				hideHeader: false
			}
		},

		beforeMount(){
			this.ConfigApiUrl(),
			this.UserProfileData()
		},

		mounted(){
			this.CheckToken(),
			this.IsLoggedIn(),
			this.CheckLogout(),
			this.EventAktif(),
			this.DetailEventProfileLogin(),
			this.StatusPembayaran(),
			this.scroll(),
			this.VenoBox()
		},

		methods: {
			scroll () {
				window.onscroll = () => {
					let bottomOfWindow = window.pageYOffset

					if (bottomOfWindow > 220) {
				        this.scrolledToBottom = true
				    }else{
				    	this.scrolledToBottom = false
				    }
			 	}
			},

			IsLoggedIn(){
				if(!this.token.accessToken){
					this.$swal({
						icon: 'error',
						title: 'Oops...',
						text: 'Anda tidak mempunyai hak akses ke halaman ini! / sesi login telah habis, silahkan login kembali',
					})
					setTimeout(() => {
						this.$router.push({
							name: 'auth-login'
						})
					}, 1300)
				}
			},

			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			CheckLogout(){
				this.$store.dispatch('config/getProfileLogout', 'logout')
			},

			ConfigApiUrl(){
				const api_url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', api_url)
			},

			EventAktif(){
				this.loading = true
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(`${this.api_url}/web/event/${this.$route.params.id}`)
				.then(({data}) => {
					this.kegiatan = data.kegiatan
					this.pelatihans = data.pelatihans
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.loading=false
				}, 900)
			},

			ToggleFile(){
				if(this.show_file || this.show_close){
					this.show_file = false
					this.show_close = false
				}
			}, 

			
			FileType(type){
				switch(type){
					case 1:
					this.type_name = 'Video Materi';
					break;
					case 2:
					this.type_name = 'File Materi'
					break;
					case 3:
					this.type_name = 'Pre Test'
					break;
					case 4:
					this.type_name = 'Post Test'
					break;
					case 5:
					this.type_name = 'File'
					break;
					case 6:
					this.type_name = 'Video Webinar'
					break;
					default:
					this.type_name = 'No type here'
				}
			},
			ShowCategory(id){
				console.log(id)
				const filter = this.pelatihans.filter(d => d.id == id)
				this.categories = filter.map(c => {
					return c.categories.map(d => {
						this.category_name = d.title
						return d
					})
				})
			},
			ShowField(raw, id_kategori='', type){
				this.loading = true
				this.show_file = true
				this.show_close = true
				this.detailed_data = raw
				let field = ''
				switch(type){
					case 1:
					field = 'video'
					break;
					case 2:
					field = 'file_pdf'
					break;
					case 3:
					field = 'pre_test'
					break;
					case 4:
					field = 'post_test'
					break;
					case 5:
					field = 'file_pdf'
					break;
					case 6:
					field = 'video'
					break;
					default:
					field = 'No field here'
				}
				this.detailed = Object.keys(raw)
				.filter(key => field.includes(key))
				.reduce((obj, key) => {
					obj[key] = raw[key];
					return obj;
				}, {});
				const format_yt  = this.detailed.video ? this.$ytString(this.detailed.video) : ''
				this.type = type
				this.FileType(type)
				this.id_test = id_kategori
				this.id_webinar = id_kategori
				setTimeout(() => {
					this.loading = false
				}, 900)
			},

			UserProfileData(){
				if(this.token){
					this.loading=true					
					const url = `${this.api_url}/web/user`
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.profiles = data.user
						this.works = data.pekerjaan
						this.username = this.$username(data.user.nama)
					})
					.catch(err => console.log(err.response ? err.response : ''))
					.finally(() => {
						setTimeout(() => {
							this.loading=false
						},1000)
					})
				}
			},

			DetailEventProfileLogin(){
				if(this.token.accessToken){
					const url = `${this.api_url}/web/event/${this.$route.params.id}`

					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.details = data.kegiatan
					})
					.catch(err => console.log(err))
				}
			},

			StatusPembayaran(){
				if(this.token.accessToken){
					this.loading=true
					const url = `${this.api_url}/web/event/${this.$route.params.id}`
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.status_pendaftaran = data.kegiatan.status_pendaftaran_value
					})
					.catch(err => console.log(err))
					.finally(() => {
						setTimeout(() => {
							this.loading=false
						}, 1000)
					})
				}
			},
			VenoBox(){
				new VenoBox({
					selector: '.event-detail',
					numeration: true,
					infinigall: true,
					share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
					spinner: 'rotating-plane'
				})
			}
		},

		computed: {
			token(){
				return this.$store.getters['config/ConfigCheckLogin']
			},
			api_url(){
				return this.$store.getters['config/ConfigApiUrl']
			},
			logout_data(){
				return this.$store.getters['config/ConfigProfileDataLogout']
			}
		}
	}
</script>

