<template>
	<div v-if="$device.isDesktop">
		<LayoutsNavbarDesktop :token="token" :profiles="profiles" :slug="slug" @logout-profile="LogoutProfile"/>
	</div>
	<div v-else>
		<LayoutsNavbarMobile :token="token" :profiles="profiles" :slug="slug" @logout-profile="LogoutProfile"/>
	</div>
</template>

<script>
	export default{
		props: ['token', 'profiles', 'slug'],

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
