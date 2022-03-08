<template>
	<div class="testimoni__list">
		<mdb-container>
			<mdb-row class="justify-content-center mt-2">
				<!-- colomn header testimoni -->
				<mdb-col class="header__inside-content" md="3">
					<h1 class="mb-3">Testimoni</h1>
					<blockquote class="mb-5">PPKC telah melakukan berbagai macam pelatihan dan telah banyak membantu meningkatkan kemampuan tenaga kesehatan</blockquote>
					<mdb-tooltip trigger="hover" :options="{placement: 'top'}">
						<span slot="tip"> Lihat semua testimoni </span>
						<nuxt-link to="/ppkc/testimoni" slot="reference">lihat semua testimoni <mdb-icon icon="arrow-right" /></nuxt-link>
					</mdb-tooltip>
				</mdb-col>
				<!-- column card testimoni -->
				<mdb-col  col="12" class="col__testimoni mt-5 mb-5" md="9">
					<!-- Testimoni card components -->
					<MoleculesHomepageMoleculesCardTestimoni :lists="lists"/>
				</mdb-col>
				<!-- <mdb-col v-else md="8" xs="12" sm="12" class="col__berita mt-3 mb-3">
					<div class="d-flex justify-content-center">
						<div class="spinner-grow text-info" style="width: 5rem; height:5rem;" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				</mdb-col> -->
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	export default{
		props: ['lists']
	}
</script>