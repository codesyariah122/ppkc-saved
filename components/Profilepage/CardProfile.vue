<template>
	<div>
		<b-card>
			<mdb-container class="profile__info-data">	

				<mdb-row class="d-flex justify-content-between">
			
					<mdb-col sm="6" md="4" class="col__img-profile">
						<div class="hover__image-wrap">
							<img v-if="profiles.photo !== 'https://api.ppkc-online.com/image-profiles/null'" :src="profiles.photo" class="img-fluid image rounded-circle"/>
							<img v-else :src="require('~/assets/images/profile/user-profile.svg')" class="img-fluid image rounded-circle">
							<div class="overlay">
								<a :data-gall="profiles.photo ? profiles.photo : `${require('~/assets/images/profile/user-profile.svg')}`" :href="profiles.photo ? profiles.photo : `${require('~/assets/images/profile/user-profile.svg')}`" class="profiles-avatar icon" title="Lihat Foto Profile">
									<mdb-icon icon="search-plus" />
								</a>
							</div>
						</div>
					</mdb-col>
					<mdb-col sm="6" md="4" class="col__data-profile">
						<h4>{{profiles.nama}}</h4>
						<ul>
							<li class="mb-2"> 
								<a :href="`mailto:${profiles.email}`">
									<mdb-icon far icon="envelope-open" /> {{profiles.email}}
								</a> 
							</li>
							<li> 
								<mdb-badge color="info"><mdb-icon icon="phone" /> {{profiles.phone}}</mdb-badge>
							</li>
						</ul>
					</mdb-col>

					<mdb-col sm="6" md="4" class="profile__options-page">
						<mdb-btn outline="primary" size="sm" >
							<a :href="`/profile/edit/${profiles.id}`">
								<mdb-icon icon="user-cog" size="lg" /> Edit
							</a>
						</mdb-btn>
						<mdb-btn color="deep-orange" size="sm" @click="LogoutProfile">
							<mdb-icon icon="sign-out-alt" size="lg"/> Logout
						</mdb-btn>
					</mdb-col>
				</mdb-row>
			</mdb-container>
		</b-card>
	</div>
</template>

<script>
	export default{
		props: ['profiles'],

		data(){
			return {
				p1: true
			}
		},

		mounted(){
			this.VenoBox()
		},

		methods: {
			VenoBox(){
				new VenoBox({
					selector: '.profiles-avatar',
					numeration: true,
					infinigall: true,
					share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
					spinner: 'rotating-plane'
				})
			},
			LogoutProfile(){
				this.$swal({
					title: `Keluar sebagai ${this.profiles.nama}?`,
					text: "Anda akan keluar dari halaman profile!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Ya, Lanjut keluar!'
				}).then((result) => {
					if (result.isConfirmed) {
						this.$store.dispatch('config/storeConfigAuth', '')
						this.$store.dispatch('config/setEventToLogin', '')
						this.$store.dispatch('config/setProfileLogout', JSON.stringify({logout: true, username: this.$username(this.profiles.nama)}))
						this.$swal(
							'Logout!',
							`Anda berhasil keluar dari profile ${this.profiles.nama}.`,
							'success'
							)

						this.$router.push({
							// name: 'auth-login'
							path: this.$route.path
						})
						setTimeout(() => {
							location.reload()
						}, 900)
					}
				})
			}
		}
	}
</script>