<template>
	<div>
		<b-card>
			<mdb-container>							
				<mdb-row class="d-flex justify-content-between profile__info-data">
					<mdb-col sm="6" md="4" class="col__img-profile">
						<img :src="require('~/assets/images/profile/user-profile.svg')" class="img-fluid rounded-circle"/>
					</mdb-col>
					<mdb-col sm="6" md="4" class="col__data-profile">
						<h4>{{profiles.nama}}</h4>
						<ul>
							<li> {{profiles.email}} </li>
							<li> {{profiles.phone}} </li>
						</ul>
					</mdb-col>

					<mdb-col sm="6" md="4" class="profile__options-page">
						<mdb-btn outline="primary" size="sm">
							<mdb-icon icon="edit" /> Edit Profile
						</mdb-btn>
						<mdb-btn color="deep-orange" size="sm" @click="LogoutProfile">
							<mdb-icon icon="edit" />Logout
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

		methods: {
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
						this.$swal(
							'Logout!',
							`Anda berhasil keluar dari profile ${this.profiles.nama}.`,
							'success'
							)

						setTimeout(() => {
							this.$router.push({
								name: 'auth-login'
							})
						}, 900)
					}
				})
			}
		}
	}
</script>