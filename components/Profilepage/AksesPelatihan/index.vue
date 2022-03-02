<template>
	<mdb-container class="akses__pelatihan">
		<b-row class="row justify-content-center">
			<b-col lg="12" xs="12" sm="12">
				<b-jumbotron class="shadow-none bg-gray">
					<b-container>
						<b-row>
							<b-col md="8" xs="12" sm="12">
								<h1 id="header">{{header.title}}</h1>
							</b-col>
						</b-row>
						<b-row class="mt-3">
							<b-col md="8" xs="12" sm="12">
								<p id="lead">{{header.context}}</p>
							</b-col>
						</b-row>
					</b-container>
					
					<b-container class="mt-5">
						<b-row v-if="loading_event" class="row justify-content-center">
							<b-col v-for="(item, index) in pelatihans" :key="item.id" md="4" xs="12" sm="12" class="mb-5">
								<b-card>
									<b-row cols="12">
										<b-col md="12" xs="12" sm="12">
											<b-skeleton-img></b-skeleton-img>
										</b-col>
										<b-col md="12" xs="12" sm="12" class="mt-2">
											<b-skeleton animation="fade" width="85%"></b-skeleton>
											<b-skeleton animation="fade" width="55%"></b-skeleton>
											<b-skeleton animation="fade" width="70%"></b-skeleton>
										</b-col>
									</b-row>
								</b-card>
							</b-col>
						</b-row>
						<b-row v-else>
							<b-col v-if="listIndex <= pelatihans.length" v-for="listIndex in listToShow" md="4" xs="12" sm="12" class="mb-3" :key="pelatihans[listIndex-1].id">
								<b-card :img-src="pelatihans[listIndex-1].photo" img-alt="Card image" img-top class="shadow-none"  :sub-title="`${$moment(pelatihans[listIndex-1].tanggal_awal).format('LL')} - ${$moment(pelatihans[listIndex-1].tanggal_akhir).format('LL')}`">

									<mdb-row col="12" class="justify-content-start content__card-event">
										<mdb-col md="12" class="desc">
											<blockquote class="blockquote-footer text-truncate">
												{{pelatihans[listIndex-1].kegiatan_desc}}
											</blockquote>
										</mdb-col>
										<mdb-col md="4">
											<span>Status : </span> 
										</mdb-col>
										<mdb-col md="1">
											<mdb-badge size="sm" class="badge btn-success mb-2 badge__category text-white" >{{pelatihans[listIndex-1].status_pendaftaran_value}}</mdb-badge>
										</mdb-col>
									</mdb-row>

									<mdb-row col="12" class="justify-content-center content__idr-event">
										<mdb-col md="12">
											<h4 class="orange-text">{{$format(pelatihans[listIndex-1].harga)}}</h4>
										</mdb-col>
									</mdb-row>

									<mdb-row col="12" class="justify-content-center content__link-event">
										<mdb-col lg="12">	
											<nuxt-link :to="`/profile/${username}/events/${pelatihans[listIndex-1].kegiatan_id}/${$slug(pelatihans[listIndex-1].kegiatan_title)}`" size="sm" class="btn btn-outline-primary font-weight-bold btn__link-event">Akses Pelatihan</nuxt-link>
										</mdb-col>
									</mdb-row>
								</b-card>
							</b-col>
						</b-row>

						<b-row v-if="listToShow <= pelatihans.length" class="row justify-content-center">
							<b-col md="12" xs="12" sm="12">
								<b-button block pill variant="primary" @click="ShowMore">Load More Event</b-button>
							</b-col>
						</b-row>
					</b-container>

				</b-jumbotron>
			</b-col>
		</b-row>
	</mdb-container>
	
</template>

<script>
	export default {
		props: ['loading_event', 'pelatihans', 'username'],
		data(){
			return{
				listToShow:3,
				header: {
					title: 'Pelatihan Saya',
					context: 'Silahkan mulai belajar dengan klik list pelatihan yang telah kamu beli, atau lihat pelatihan terbaru lainnya dibagian bawah halaman ini. Selamat belajar!'
				}
			}
		},

		methods: {
			ShowMore(page=0){
				this.listToShow+=3
				console.log(this.listToShow)
				if(this.listToShow % 2 == 20){
					const page = page*2
				}

				this.$emit('event-diikuti', page, '', '')
			}
		}
	}
</script>

<style lang="scss">
	.akses__pelatihan{
		margin-top: -5rem;
		font-family: 'Poppins', sans-serif;
		.jumbotron{
			background-color: $jumbotron-bg;
			h1{
				font-size: 2rem;
				font-weight: 800;
			}
			p{
				font-size: 16px;
				font-weight: 400;
			}
			.card{
				height: auto;
				width: 287px;
				margin-left: -1rem;
				.card-subtitle{
					font-size: 12px;
				}
				&:hover{
					background-color: $bg-blue-gray;
				}
				.content__card-event{
					.desc{
						margin-top: 1rem;
					}
				}
				.content__idr-event{
					margin-top: 1rem;
					h4{
						font-size:18px!important;
					}
				}

				.content__link-event{
					.btn__link-event{
						font-size: 14px;
						margin-top: 1rem;
						width: 100%;
					}
				}
			}
		}
	}
@media (min-width: 992px) {
	.akses__pelatihan{
		margin-top: 1rem;
		font-family: 'Poppins', sans-serif;
		.jumbotron{
			background-color: $jumbotron-bg;
			h1{
				font-size: 2rem;
				font-weight: 800;
			}
			p{
				font-size: 18px;
				font-weight: 400;
			}
			.card{
				width: auto;
				height: auto;
				.card-subtitle{
					font-size: 14px;
				}
				&:hover{
					background-color: $bg-blue-gray;
				}
				.content__card-event{
					.desc{
						margin-top: 3rem;
					}
				}
				.content__idr-event{
					margin-top: 2rem;
					h4{
						font-size:23px!important;
					}
				}

				.content__link-event{
					.btn__link-event{
						margin-top: 2rem;
						width: 100%;
					}
				}
			}
		}
	}
}
</style>