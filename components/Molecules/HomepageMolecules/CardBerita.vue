<template>
	<div>

		<!-- card lists -->
		<mdb-row>
			<!-- <pre>
				{{lists}}
			</pre> -->
			<mdb-col v-if="listsIndex <= lists.length" v-for="listsIndex in listsToShow" md="5" :class="`${$device.isDesktop || $device.isTablet ? 'mr-5' : ''}`" :key="lists[listsIndex-1].id">
				<mdb-card>
					<mdb-view hover class="rounded">
						<a :href="`/detail/berita/${lists[listsIndex-1].id}/${$slug(lists[listsIndex-1].judul)}`">
							<mdb-card-image
							:src="lists[listsIndex-1].foto_url"
							alt="Card image cap" class="img-fluid"/>
							<mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
						</a>
					</mdb-view>
					<mdb-card-body>
						<mdb-card-title class="mb-5 mt-1">{{lists[listsIndex-1].judul}}</mdb-card-title>
						<nuxt-link :to="{name: `detail-berita-id-slug`, params: {id: lists[listsIndex-1].id, slug: $slug(lists[listsIndex-1].judul)}}" class="mt-5 mb-2" color="primary">Baca Selengkapnya <mdb-icon icon="arrow-right" /></nuxt-link>
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