<template>
	<div class="mt-2 card__content-events">
		<mdb-container>
			<mdb-row v-if="loading" col="12" class="d-flex justify-content-center align-items-stretch mb-5 mt-5">
				
				<mdb-col v-if="empty" lg="12" xs="12" sm="12">
					<center>						
						<div class="spinner-border text-primary" style="width:7rem; height: 7rem;" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</center>
				</mdb-col>

				<mdb-col v-else v-for="(item, index) in lists" md="4" :key="item.id">
					<b-card>
						<b-row>
							<b-col cols="12" class="mb-3">
								<b-skeleton-img></b-skeleton-img>
							</b-col>
							<b-col cols="12">
								<b-skeleton animation="wave" width="85%"></b-skeleton>
								<b-skeleton animation="wave" width="55%"></b-skeleton>
								<b-skeleton animation="wave" width="70%"></b-skeleton>
							</b-col>
						</b-row>
					</b-card>
				</mdb-col>

			</mdb-row>

			<mdb-row v-else col="12" class="d-flex justify-content-center align-items-stretch mb-5 webinar__content">
				<mdb-col v-if="empty || error_search" lg="12" xs="12" sm="12">
					<mdb-alert :color="`${error_search ? 'danger' : 'info'}`" class="text-center">
						<mdb-icon icon="info-circle" size="lg"/> {{message}}
					</mdb-alert>
				</mdb-col>

				
				<mdb-col v-else id="show-event" v-for="list in lists" md="4" xs="12" sm="12" :key="list.kegiatan_id">
					<mdb-card>
						<div class="event__image-wrap">
							<mdb-card-image v-if="list.photo == 'https://api.ppkc-online.com/image-kegiatans/null'" :src="require('~/assets/images/homepage/default.jpg')" alt="No image found"></mdb-card-image>
							<mdb-card-image v-else :src="list.photo" :alt="list.kegiatan_title" ></mdb-card-image>
							<div class="overlay__event-img">
								<a :data-gall="list.photo" :href="list.photo" class="list-events icon" title="Lihat Foto">
									<mdb-icon icon="search-plus" />
								</a>
							</div>
						</div>
						<mdb-card-body>
							<mdb-badge class="badge btn-outline-primary mb-2" style="color:#004899!important;">{{list.kategori_value}}</mdb-badge>


							<mdb-card-title>{{list.kegiatan_title}}</mdb-card-title>
							<span>{{$moment(list.tgl_awal).format("LL")}} - {{$moment(list.tgl_akhir).format("LL")}}</span>

							<p class="text-gray text-truncate mb-2">
								{{list.kegiatan_desc}}
							</p>

							<span class="idr__color">
								{{$format(list.harga)}}
							</span>


							<div v-if="$route.path === '/events'">
								<nuxt-link  :to="{name: `detail-event-id-slug`, params: {id: list.kegiatan_id, slug: $slug(list.kegiatan_title)}}" class="btn btn-outline-primary mt-5 mb-2 btn-block" color="primary">Detail Event</nuxt-link>
							</div>

							<div v-else>
								<mdb-btn v-if="data_event || token.accessToken" color="primary" size="md" class="btn btn-outline-primary mt-5 mb-2 btn-block" @click="RegistrasiEvent(list.kegiatan_id)">Daftar</mdb-btn>

								<nuxt-link v-else :to="{name: `detail-event-id-slug`, params: {id: list.kegiatan_id, slug: $slug(list.kegiatan_title)}}" class="btn btn-outline-primary mt-5 mb-2 btn-block" color="primary">Detail Event</nuxt-link>
							</div>
						</mdb-card-body>
					</mdb-card>
				</mdb-col>

			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	export default{
		props: ['loading', 'lists', 'listToShow', 'token', 'data_event', 'empty', 'message', 'error_search'],

		data(){
			return {
				timer: 0,
				value: 0,
				max: 500
			}
		},

		mounted(){
			this.VenoBox(),
			this.startTimer(),
			console.log(this.error_search)
		},

		methods: {
			RegistrasiEvent(id){
				this.$emit('registrasi-event', id)
			},
			VenoBox(){
				new VenoBox({
					selector: '.list-events',
					numeration: true,
					infinigall: true,
					share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
					spinner: 'rotating-plane'
				})
			},

			startTimer() {
				let vm = this;
				let timer = setInterval(function() {
					vm.value += 6;
					if (vm.value >= vm.max) clearInterval(timer);
				}, 100);
				vm.value = 0
			}
		}
	}
</script>