<template>
	<div class="testimoni__list">
		<mdb-container>
			<mdb-row class="justify-content-center">
				<!-- colomn header testimoni -->
				<mdb-col class="header__inside-content" md="3">
					<h1 class="mb-3">Testimoni</h1>
					<blockquote class="mb-5">PPKC telah melakukan berbagai macam pelatihan dan telah banyak membantu meningkatkan kemampuan tenaga kesehatan</blockquote>
					<mdb-tooltip trigger="hover" :options="{placement: 'top'}">
						<span slot="tip"> Lihat semua berita </span>
						<nuxt-link to="/ppkc/testimoni" slot="reference">lihat semua testimoni <mdb-icon icon="arrow-right" /></nuxt-link>
					</mdb-tooltip>
				</mdb-col>
				<!-- column card testimoni -->
				<mdb-col col="12" class="col__testimoni mt-5 mb-5" md="9">
					<!-- Testimoni card components -->
					<MoleculesHomepageMoleculesCardTestimoni :lists="lists"/>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	export default{
		props: ['lists']
	}
</script>