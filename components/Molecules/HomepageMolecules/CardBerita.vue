<template>
	<div>
		<mdb-row col="12" class="slider__berita">

			<mdb-col v-if="listsIndex <= lists.length" v-for="listsIndex in listsToShow" md="4" class="card__berita-list"  :key="lists[listsIndex-1].id">
				<mdb-card class="mt-2">
					<mdb-card-image :src="lists[listsIndex-1].foto_url" alt="Card image cap"></mdb-card-image>
					<mdb-card-body>
						<mdb-card-title>{{lists[listsIndex-1].judul}}</mdb-card-title>
						<br>
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
				listsToShow: 6
			}
		},
		mounted(){
			this.TnsSlider()
		},
		methods: {
			TnsSlider(){
				tns({
					"container": ".slider__berita",
					"items": this.$device.isDesktop ? 2 : 1,
					"center": true,
					"slideBy": 'page',
					"loop": false,
					"swipeAngle": true,
					"mouseDrag": true,
					"speed": 400,
					"nav": false,
					"controls": this.$device.isDesktop ? false : true,
				});
			}
		}
	}
</script>