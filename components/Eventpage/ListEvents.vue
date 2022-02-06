<template>
	<div class="card__list">
		<mdb-container class="mt-5 mb-5">
			<!-- delay looping data with loader spinner -->
			<mdb-row v-if="loading" class="row justify-content-center">
				<mdb-col lg="12" xs="12" sm="12">
					<div class="d-flex justify-content-center">
						<div class="spinner-grow text-primary" role="status" style="width: 3rem; height: 3rem;">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				</mdb-col>	
			</mdb-row>

			<!-- show card event -->
			<mdb-row v-else class="row justify-content-center mt-5 mb-5 card__content">
				<mdb-col v-if="empty" lg="12" xs="12" sm="12">
					<mdb-alert color="warning text-center">
						{{message}}
					</mdb-alert>
				</mdb-col>

				<!-- List event inside global-components -->
				<mdb-col lg="12" xs="12" sm="12">
					<div class="card__list">
						<GlobalsListEvent :lists="lists" :listToShow="listToShow" :token="token" :data_event="data_event" @registrasi-event="RegistrasiEvent"/>
					</div>
				</mdb-col>
				
			</mdb-row>
		</mdb-container>

	</div>
</template>

<script>

	export default{
		props: ['lists', 'loading', 'loadingBtn', 'listToShow', 'message', 'empty'],

		methods: {
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			ConfigApiUrl(){
				const api_url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', api_url)
			},

			SetEventLogin(data){
				this.$store.dispatch('config/setEventToLogin', JSON.stringify(data))
				this.$router.push({
					name: 'auth-login'
				})
			},

			GetEventDataLogin(){
				this.$store.dispatch('config/getEventDataToLogin', 'event')
			},

			RegistrasiEvent(id){
				this.$router.push({
					name: 'events-id-registrasi',
					params: {
						id: id
					}
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

			set_event(){
				return this.$store.getters['config/ConfigSetEventLogin']
			},

			data_event(){
				return this.$store.getters['config/ConfigEventDataLogin']
			}
		}
	}
</script>