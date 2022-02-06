<template>
	<!-- Footer -->
	<mdb-footer class="footer__layout font-small">
		<mdb-container class="text-left footer__sitemap">
			<mdb-row :class="`${$device.isMobile ? 'd-flex justify-content-center' : 'row'}`">
				<!-- footer branding content -->
				<mdb-col col="10" sm="3" class="mt-5 col-1">
					<!-- <h5 class="title">Footer Content</h5> -->
					<img :src="brand">
					<p>Pusat Pengembangan Kesehatan Carolus (PPKC) sebagai Lembaga pelatihan yang mampu memberikan solusi setiap permasalahan di Bidang kesehatan.</p>
					<address>
						Jl. Salemba Tengah 30-32,
						Jakarta Pusat 10440
					</address>
				</mdb-col>

				<mdb-col col="12" sm="7" :class="`${$device.isMobile ? 'mt-2 col-2' : 'mt-5 col-2'}`">
					<!-- sitemap footer content -->
					<SiteMap/>
				</mdb-col>

			</mdb-row>

			<!-- Bonus Map -->
			<mdb-row>
				<mdb-col col="12" lg="12" class="col-3">
					<LayoutsMap/>
				</mdb-col>
			</mdb-row>
			<!-- end map -->

		</mdb-container>
		<div class="footer-copyright text-center py-3">
			<mdb-container fluid>
				&copy;Copyright {{$moment(year).year()}} <a target="_blank" href="https://ppkc-online.com">Pusat Pengembangan Kesehatan Carolus</a>. All Rights Reserved
			</mdb-container>
		</div>
	</mdb-footer>
	<!-- Footer -->
</template>

<script>
	import LogoBrand from '~/assets/images/logo/brand.svg'
	import SiteMap from '@/components/Molecules/LayoutMolecules/SiteMap'

	export default{
		components: {
			SiteMap
		},

		data(){
			return{
				brand: LogoBrand,
				year: new Date()
			}
		}
	}
</script>