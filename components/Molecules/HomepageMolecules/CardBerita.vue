<template>
	<div>

		<!-- card lists -->
		<mdb-row class="row justify-content-center">
			<!-- <pre>
				{{lists}}
			</pre> -->
			<mdb-col v-if="listIndex <= lists.length" v-for="listIndex in listsToShow" md="5" :class="`${$device.isDesktop || $device.isTablet ? 'mr-5' : ''}`" :key="lists[listIndex-1].id">
				<mdb-card>
					<mdb-view hover class="rounded">
						<a :href="`/detail/berita/${lists[listIndex-1].id}/${$slug(lists[listIndex-1].judul)}`">
							<mdb-card-image
							:src="lists[listIndex-1].foto_url"
							alt="Card image cap" class="img-fluid"/>
							<mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
						</a>
					</mdb-view>
					<mdb-card-body>
						<mdb-card-title class="mb-5 mt-1">{{lists[listIndex-1].judul}}</mdb-card-title>

						<mdb-tooltip trigger="hover" :options="{placement: 'top'}">
							<span slot="tip"> Baca berita secara lengkap </span>
							<a :href="`/detail/berita/${lists[listIndex-1].id}/${$slug(lists[listIndex-1].judul)}`" slot="reference">Baca Selengkapnya <mdb-icon icon="arrow-right" /></a>
						</mdb-tooltip>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>
		</mdb-row>

	</div>
</template>

<script>
	export default{
		props: ['lists'],
		data(){
			return {
				listsToShow: 2
			}
		}
	}
</script>