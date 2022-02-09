<template>
	<div class="berita__list">
		<mdb-container>
			<mdb-row class="justify-content-between">
				<!-- colomn header berita -->
				<mdb-col class="header__inside-content" md="3">
					<h1 class="mb-3">Berita</h1>
					<blockquote class="mb-5">Ikuti semua kegiatan dan berita dari PPKC</blockquote>
					<mdb-tooltip trigger="hover" :options="{placement: 'top'}">
						<span slot="tip"> Lihat semua berita </span>
						<nuxt-link to="/ppkc/berita" class="btn__tooltip" slot="reference">
							lihat semua berita 
							<mdb-icon icon="arrow-right" />
						</nuxt-link>
					</mdb-tooltip>
				</mdb-col>

				<!-- column card berita -->
				<mdb-col class="col__berita mt-3 mb-5" md="9">
					<!-- Card berita components -->
					<CardBerita :lists="lists" ref="childBerita"/>	
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	import CardBerita from '@/components/Molecules/HomepageMolecules/CardBerita'

	export default{
		props: ['lists'],
		components: {
			CardBerita
		}
	}
</script>