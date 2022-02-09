<template>
	<div>
		<mdb-row class="justify-content-center card__content">
			<!-- column event -->
			<mdb-col v-if="listIndex <= lists.length" v-for="listIndex in listsToShow" md="4" class="mb-3" :key="lists[listIndex-1].kegiatan_id">
				<mdb-card>
					<mdb-view hover>
						<a href="#!">
							<mdb-card-image
							:src="lists[listIndex-1].photo"
							alt="Card image cap" class="img-fluid"/>
							<mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
						</a>
					</mdb-view>
					<mdb-card-body>
						<mdb-badge class="badge btn-outline-primary mb-4 badge__category">{{lists[listIndex-1].kategori_value}}</mdb-badge>

						<mdb-card-title>{{lists[listIndex-1].kegiatan_title}}</mdb-card-title>
						<!-- <mdb-card-text class="text-truncate" style="width:200px;">{{lists[listIndex-1].kegiatan_desc}}</mdb-card-text> -->
						<span class="mt-5">{{$moment(lists[listIndex-1].tgl_awal).format("LL")}} - {{$moment(lists[listIndex-1].tgl_akhir).format("LL")}}</span>
						<br>
						<span class="mt-2 idr__color">
							{{$format(lists[listIndex-1].harga)}}
						</span>
						<!-- <mdb-btn @click="ToDetailEvent(lists[listIndex-1].kegiatan_id)" block class="btn btn-outline-primary mt-3 mb-2" color="primary">Detail Event</mdb-btn> --> <br>
						<nuxt-link :to="{name: `detail-event-id-slug`, params: {id: lists[listIndex-1].kegiatan_id, slug: $slug(lists[listIndex-1].kegiatan_title)}}" class="btn btn-outline-primary mt-3 mb-2 btn-block" color="primary">Detail Event</nuxt-link>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['lists', 'listsToShow']
	}
</script>