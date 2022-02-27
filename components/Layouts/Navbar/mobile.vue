<template>
	<div>
		<mdb-navbar class="fixed-top lighten-4 navbar-9" light color="white" expand="large" togglerIcon="" animated animation="2">
			<!-- Navbar brand -->
			<mdb-navbar-brand>
				<nuxt-link to="/">
					<MoleculesLayoutMoleculesBrand/>
				</nuxt-link>
			</mdb-navbar-brand>
			<mdb-navbar-toggler class="mt-3 mb-2">
				<mdb-navbar-nav right>
					<mdb-nav-item active waves-fixed to="/">
						Home
					</mdb-nav-item>
					<mdb-nav-item waves-fixed to="/events">
						Events
					</mdb-nav-item>
					<mdb-dropdown tag="li" class="nav-item">
						<mdb-dropdown-toggle tag="a" navLink  slot="toggle"  waves-fixed>
							Tetang PPKC
						</mdb-dropdown-toggle>
						<mdb-dropdown-menu :class="`${$device.isDesktop ? 'mt-4' : ''}`">
							<mdb-dropdown-item v-for="item in links" :key="item.id">
								<nuxt-link :to="item.link">
									{{item.name}}
								</nuxt-link>
							</mdb-dropdown-item>
						</mdb-dropdown-menu>
					</mdb-dropdown>
				</mdb-navbar-nav>
				<!-- check user login -->
				<mdb-dropdown v-if="token.accessToken" tag="li" class="nav-item">
					<mdb-dropdown-toggle tag="a" navLink slot="toggle" size="md"><mdb-icon far icon="user-circle" /> Profile</mdb-dropdown-toggle>
					<mdb-dropdown-menu>
						<mdb-dropdown-item>
							<a :href="`/profile/${$username(slug)}`" class="text-center">
								<mdb-icon icon="user-md" /> {{ profiles.nama }}
							</a>
						</mdb-dropdown-item>
						<div class="dropdown-divider"></div>
						<mdb-dropdown-item @click="Logout" class="text-center">
							<mdb-icon icon="sign-out-alt" /> Logout
						</mdb-dropdown-item>
					</mdb-dropdown-menu>
				</mdb-dropdown>

				<mdb-btn v-else size="sm" @click="$router.push({path: '/auth/login'})" block class="my__btn-primary mt-4 rounded">Masuk</mdb-btn>
				<!-- end check -->
			</mdb-navbar-toggler>
		</mdb-navbar>
	</div>
</template>

<script>
	export default {
		props: ['token', 'profiles', 'slug'],
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

		methods: {
			Logout(){
				this.$emit('logout-profile')
			}
		}
	}
</script>
