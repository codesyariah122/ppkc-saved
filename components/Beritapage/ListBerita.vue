<template>
	<div>
		<div class="card__list" :style="berita__list_style">
			<mdb-container>
				<mdb-row class="justify-content-center">
					<mdb-col lg="12" xs="12" sm="12" class="mt-2">
						<mdb-alert color="info" class="text-center">
							Silahkan gunakan tombol halaman dibawah untuk melihat daftar event lainnya.
						</mdb-alert>
					</mdb-col>
					<mdb-pagination color="blue" md class="mt-3">
						<b-pagination 
						v-model="currentPage"
						:total-rows="lists.length"
						:per-page="listToShow"
						@change="LoadBerita" aria-controls="show-event" align="center"></b-pagination>
					</mdb-pagination>
					<mdb-col lg="12" xs="12" sm="12" class="mt-2">
						<mdb-badge pill color="light-blue">Page : {{currentPage}}</mdb-badge>
					</mdb-col>
				</mdb-row>
				<!-- delay looping data with loader spinner -->
				<mdb-row v-if="loading" class="row justify-content-center">
					<mdb-col lg="12" xs="12" sm="12">
						<div class="d-flex justify-content-center mt-5 mb-5">
							<div class="spinner-grow text-primary" role="status" style="width: 3rem; height: 3rem;">
								<span class="sr-only">Loading...</span>
							</div>
						</div>
					</mdb-col>	
				</mdb-row>

				<!-- show card berita -->
				<mdb-row v-else class="row justify-content-center mb-5 webinar__content">

					<!-- List berita inside global-components -->
					<mdb-col lg="12" xs="12" sm="12">
						<div class="card__list">
							<GlobalsListBerita :lists="lists" :listToShow="listToShow"/>
						</div>
					</mdb-col>

				</mdb-row>
			</mdb-container>
		</div>
	</div>
</template>

<script>

	export default{
		props: ['lists', 'loading', 'listToShow'],
		data(){
			return {
				currentPage: 1,

				berita__list_style: this.$router.path == 'berita' && this.$device.isDeskktop ? 'margin-top: 15rem;' : 'margin-top: 5rem;'
			}
		},

		methods: {
			LoadBerita(page){
				this.$emit('load-more-berita', page)
			}
		}
	}
</script>