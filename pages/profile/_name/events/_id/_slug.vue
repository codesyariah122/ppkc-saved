<template>
	<div>
		<div class="docs-wrapper">
			<ProfilepageEventDashboardSidebar :loading="loading" :username="username" :pelatihans="pelatihans" :scrolledToBottom="scrolledToBottom" @show-field="ShowField" @toggle-file="ToggleFile"/>

			<div class="docs-content">
				<div class="container">

					<!-- Sidebar Toggler -->
					<MoleculesProfilePageTogglerSidebar/>

					<article v-if="!show_file" class="docs-article mt-5" id="section-1">
						<header  class="docs-header">
							<section class="docs-intro">
								<ProfilepageEventDashboardDetailEvent :details="details" :loading="loading" :status_pendaftaran="status_pendaftaran"/>
							</section><!--//docs-intro-->
						</header>

						<section class="docs-section mt-2" id="item-1-1">
							<div v-if="loading" class="mb-5">
								<b-card>
									<b-skeleton animation="wave" width="85%"></b-skeleton>
									<b-skeleton animation="wave" width="55%"></b-skeleton>
									<b-skeleton animation="wave" width="70%"></b-skeleton>
								</b-card>
							</div>
							<div v-else class="callout-block callout-block-info">
								<div class="content">
									<h2 class="callout-title">
										<span class="callout-icon-holder me-1">
											<i class="fas fa-info-circle"></i>
										</span>
										{{ucapan}} {{profiles.nama}}
									</h2>
									<p>
										<strong>Selamat Datang di Dashboard Pelatihan PPKC</strong> <br>
										Untuk mengakses materi pelatihan silahkan click /tap tombol humberger menu <mdb-icon icon="bars" class="text-primary" size="lg" style="color: blue!important;" />, &nbsp;&nbsp; kemudian akan muncul slide menu pelatihan yang anda ikuti dari sebelah kiri.
									</p>
								</div>
							</div>
						</section><!--//section-->
					</article>

					<article v-else class="docs-article mt-5" id="section-2">
						<div v-if="loading_file">
							<b-card>
								<b-skeleton animation="throb" width="85%"></b-skeleton>
								<b-skeleton animation="throb" width="55%"></b-skeleton>
								<b-skeleton animation="throb" width="70%"></b-skeleton>
							</b-card>
						</div>

						<div v-else>
							<div v-if="type == 1" class="embed__file">
								<header class="docs-header">
									<section class="docs-intro">
										<mdb-badge color="primary" class="mb-2">{{type_name}}</mdb-badge>
										<h2>{{detailed_data.title}}</h2>
									</section><!--//docs-intro-->
								</header>
								<section class="docs-section mt-2" id="item-1-1">
									<div v-if="link_yt">
										<center>
											<b-col cols="12" class="mt-3">
												<b-skeleton-img no-aspect height="150px"></b-skeleton-img>
											</b-col>
										</center>
									</div>
									<div v-else>
										<EventpageVideoSection :video="detailed.video"/>
									</div>
								</section>
							</div>

							<div v-else-if="type == 2" class="embed__file">
								<header class="docs-header">
									<section class="docs-intro">
										<mdb-badge color="primary" class="mb-2">{{type_name}}</mdb-badge>
										<h2>{{detailed_data.title}}</h2>
									</section><!--//docs-intro-->
								</header>
								<section class="docs-section mt-2" id="item-1-1">
									<object :data="detailed.file_pdf" type="application/pdf" width="100%" :height="`${$device.isDesktop ? '900px' : '600px'}`">
									</object>
								</section>
							</div>

							<div v-else-if="type == 3" class="embed__file">
								<header class="docs-header">
									<section class="docs-intro">
										<mdb-badge color="success" class="mb-2">{{type_name}}</mdb-badge>
										<h2>{{detailed_data.title}}</h2>
									</section><!--//docs-intro-->
								</header>
								<section class="docs-section" id="item-1-1">
									<EventTestPreTest :id_test="id_test" :type_name="type_name" :token="token" :api_url="api_url"/>
								</section>
							</div>

							<div v-else-if="type == 4" class="embed__file">
								<header class="docs-header">
									<section class="docs-intro">
										<mdb-badge color="success" class="mb-2">{{type_name}}</mdb-badge>
										<h2>{{detailed_data.title}}</h2>
									</section><!--//docs-intro-->
								</header>
								<section class="docs-section" id="item-1-1">
									<EventTestPostTest :id_test="id_test" :type_name="type_name" :token="token" :api_url="api_url"/>
								</section>
							</div>

							<div v-else-if="type == 5" class="embed__file">
								<header class="docs-header">
									<section class="docs-intro">
										<mdb-badge color="primary" class="mb-2">{{type_name}}</mdb-badge>
										<h2>{{detailed_data.title}}</h2>
									</section><!--//docs-intro-->
								</header>
								<section class="docs-section mt-2" id="item-1-1">
									<object :data="detailed.file_pdf" type="application/pdf" width="100%" :height="`${$device.isDesktop ? '900px' : '600px'}`">
									</object>
								</section>
							</div>

							<div v-else-if="type == 6" class="embed__file">
								<header class="docs-header">
									<section class="docs-intro">
										<mdb-badge color="info" class="mb-2">{{type_name}}</mdb-badge>
										<h2>{{detailed_data.title}}</h2>
									</section><!--//docs-intro-->
								</header>
								<section class="docs-section mt-2" id="item-1-1">
									<mdb-alert v-if="api_url=='https://api.ppkc-online.com/api/v1'" color="danger">
										<mdb-icon icon="info-circle" /> video webinar tidak tersedia
									</mdb-alert>
									<EventWebinar v-else :id_webinar="id_webinar" :token="token" :api_url="api_url"/>
								</section>
							</div>
						</div>
					</article>

					<footer class="footer mt-5">
						<div class="container text-center py-5">
							<small class="copyright">Template Copyright &copy; <a href="https://new.ppkc-online.com" target="_blank">PPKC Caroulus</a></small>
							<ul class="social-list list-unstyled pt-4 mb-0">
								<li class="list-inline-item"><a href="#"><i class="fab fa-github fa-fw"></i></a></li> 
								<li class="list-inline-item"><a href="#"><i class="fab fa-twitter fa-fw"></i></a></li>
								<li class="list-inline-item"><a href="#"><i class="fab fa-slack fa-fw"></i></a></li>
								<li class="list-inline-item"><a href="#"><i class="fab fa-product-hunt fa-fw"></i></a></li>
								<li class="list-inline-item"><a href="#"><i class="fab fa-facebook-f fa-fw"></i></a></li>
								<li class="list-inline-item"><a href="#"><i class="fab fa-instagram fa-fw"></i></a></li>
							</ul><!--//social-list-->
						</div>
					</footer>
				</div> 
			</div>
		</div><!--//docs-wrapper-->
	</div>
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
				loading_file:null,
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
				link_yt: '',
				show_close: false,
				scrolledToBottom:false,
				hideHeader: false,
				ucapan: ''
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
			this.VenoBox(),
			this.WelcomeText()
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
				console.log("OKKKk")
				this.loading_file = true
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
				const yt_link  = this.detailed.video ? this.$ytString(this.detailed.video) : ''
				this.link_yt = yt_link ? true : false

				this.type = type
				this.FileType(type)
				this.id_test = id_kategori
				this.id_webinar = id_kategori
				setTimeout(() => {
					window.scrollTo(0, 0);
					this.loading_file = false
				}, 900)
				setTimeout(() => {
					this.link_yt = false
				}, 1500)
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

			WelcomeText(){
				var h=(new Date()).getHours();
				var m=(new Date()).getMinutes();
				var s=(new Date()).getSeconds();
				if (h >= 4 && h < 10) this.ucapan = "Selamat Pagi,";
				if (h >= 10 && h < 15) this.ucapan = "Selamat Siang,";
				if (h >= 15 && h < 18) this.ucapan =  "Selamat Sore,";
				if (h >= 18 || h < 4) this.ucapan = "Selamat Malam,";
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

