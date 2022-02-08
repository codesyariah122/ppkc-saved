<template>
	<div class="mt-2 card__content">
		<mdb-row>
			<mdb-col id="show-event" v-for="list in lists" class="col-lg-4 d-flex align-items-stretch" md="4" xs="12" sm="12" :key="list.kegiatan_id">
				<mdb-card>
					<mdb-view hover>
						<a :href="`/detail/event/${list.kegiatan_id}/${$slug(list.kegiatan_title)}`">
							<mdb-card-image
							:src="list.photo"
							alt="Card image cap" class="img-fluid"/>
							<mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
						</a>
					</mdb-view>
					<mdb-card-body>
						<mdb-badge class="badge btn-outline-primary mb-4" style="color:#004899!important;">{{list.kategori_value}}</mdb-badge>

						<!-- <p>
							{{list.kegiatan_id}}
						</p> -->

						<mdb-card-title>{{list.kegiatan_title}}</mdb-card-title>

						<span class="mt-2">{{$moment(list.tgl_awal).format("LL")}} - {{$moment(list.tgl_akhir).format("LL")}}</span>
						<br>
						
						<span class="mt-2 idr__color">
							{{$format(list.harga)}}
						</span>


						<div v-if="$route.path === '/events'">
							<nuxt-link  :to="{name: `detail-event-id-slug`, params: {id: list.kegiatan_id, slug: $slug(list.kegiatan_title)}}" class="btn btn-outline-primary mt-3 mb-2 btn-block" color="primary">Detail Event</nuxt-link>
						</div>

						<div v-else>
							<mdb-btn v-if="data_event || token.accessToken" color="primary" size="md" class="btn btn-outline-primary mt-3 mb-2 btn-block" @click="RegistrasiEvent(list.kegiatan_id)">Daftar</mdb-btn>

							<nuxt-link v-else :to="{name: `detail-event-id-slug`, params: {id: list.kegiatan_id, slug: $slug(list.kegiatan_title)}}" class="btn btn-outline-primary mt-3 mb-2 btn-block" color="primary">Detail Event</nuxt-link>
						</div>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['lists', 'listToShow', 'token', 'data_event'],

		methods: {
			RegistrasiEvent(id){
				this.$emit('registrasi-event', id)
			}
		}
	}
</script>