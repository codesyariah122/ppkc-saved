<template>
	<div>
		<mdb-navbar class="fixed-top" light color="white" expand="large" togglerIcon="" animated animation="3">
			
			<mdb-container>
				<!-- Navbar brand -->
				<mdb-navbar-brand>
					<nuxt-link to="/">
						<MoleculesLayoutMoleculesBrand/>
					</nuxt-link>
				</mdb-navbar-brand>
				<mdb-navbar-toggler>
					<mdb-navbar-nav right>
						<mdb-nav-item active waves-fixed>
							<nuxt-link to="/">
								Home
							</nuxt-link>
						</mdb-nav-item>
						<mdb-nav-item waves-fixed>
							<nuxt-link to="/events">
								Events
							</nuxt-link>
						</mdb-nav-item>
						<mdb-dropdown tag="li" class="nav-item">
							<mdb-dropdown-toggle tag="a" navLink color="white" slot="toggle"  waves-fixed>
								Tentang PPKC
							</mdb-dropdown-toggle>
							<mdb-dropdown-menu :class="`${$device.isDesktop ? 'mt-3' : ''}`">
								<mdb-dropdown-item v-for="item in links" :key="item.id">
									<nuxt-link :to="item.link">
										{{item.name}}
									</nuxt-link>
								</mdb-dropdown-item>
							</mdb-dropdown-menu>
						</mdb-dropdown>
					</mdb-navbar-nav>
					<!-- <mdb-btn v-if="$device.isMobile" size="md" @click="$router.push({name: 'auth-login'})" block class="my__btn-primary mt-5 rounded">Masuk</mdb-btn> -->

					<!-- check user login -->
					<mdb-dropdown v-if="token.accessToken" tag="li" class="nav-item nav-profile" style="font-size:31px!important;">
						<mdb-dropdown-toggle tag="a" navLink slot="toggle">
							<mdb-icon far icon="user-circle" /> Profile
						</mdb-dropdown-toggle>
						<mdb-dropdown-menu>
							<mdb-dropdown-item>
								<nuxt-link :to="{name: 'profile-slug', params: {slug: $username(slug)}}" class="text-center">
									<mdb-icon icon="user-check" /> {{profiles.nama}}
								</nuxt-link>
							</mdb-dropdown-item>
							<div class="dropdown-divider"></div>
							<mdb-dropdown-item @click="Logout" class="text-center">
								<mdb-icon icon="sign-out-alt" /> Logout
							</mdb-dropdown-item>
						</mdb-dropdown-menu>
					</mdb-dropdown>
					<mdb-btn v-else @click="GoToLogin" class="my__btn-primary ml-4 rounded" size="md">Masuk</mdb-btn>
					<!-- end check -->
				</mdb-navbar-toggler>
			</mdb-container>
			
		</mdb-navbar>
	</div>
</template>

<script>
	export default {
		props: ['token', 'profiles', 'slug', 'event_id', 'event_path'],
		data(){
			return  {
				links: [
				{id:1, name: 'Sejarah', link: '/ppkc/sejarah'},
				{id:2, name: 'Visi & Misi', link: '/ppkc/visi-misi'},
				{id:3, name: 'Struktur Organisasi', link: '/ppkc/struktur-organisasi'},
				{id:4, name: 'Fasilitas', link: '/ppkc/fasilitas'},
				{id:5, name: 'Berita', link: '/ppkc/berita'},
				{id:6, name: 'Testimoni', link: '/ppkc/testimoni'},
				{id:7, name: 'Fasilitator', link: '/ppkc/fasilitator'},
				{id:8, name: 'Yayasan & Direksi', link: '/ppkc/yayasan-direksi'}
				]
			}
		},

		mounted(){
			console.log(this.event_id)
		},

		methods: {
			Logout(){
				this.$emit('logout-profile')
			},

			GoToLogin(){
				if(this.event_id === this.$route.params.id){
					const data = {
						event_id: this.event_id,
						event_path: this.event_path
					}
					this.SetEventLogin(data)
				}else{
					this.$router.push({name: 'auth-login'})
				}
			},

			SetEventLogin(data){
				this.$store.dispatch('config/setEventToLogin', JSON.stringify(data))
				this.$router.push({
					name: 'auth-login'
				})
			}
		},

		computed: {
			set_event(){
				return this.$store.getters['config/ConfigSetEventLogin']
			}
		}
	}
</script>
