<template>
	<div>
		<mdb-row cols="12" class="justify-content-end filtering__form-data">
			<mdb-col md="2">
				<h5>Filter</h5>
			</mdb-col>
			<mdb-col md="10">
				<form @submit.prevent="FilterEventChild">
					<mdb-row>
						<mdb-col md="3">
							<select selected :value="undefined" @change="ChangeCategoryChild($event)">
								<option value="">Jenis Pelatihan</option>
								<option v-for="(item, index) in categories" :value="item.code">
									{{item.value}}
								</option>
							</select>
						</mdb-col>
						<mdb-col md="3">
							<select selected :value="undefined" @change="ChangeMonthChild($event)">
								<option value="">Bulan Pelatihan</option>
								<option v-for="(month, index) in $moment.months()" :value="index + 1">
									{{month}}
								</option>
							</select>
						</mdb-col>
						<mdb-col md="4">
							<mdb-btn size="sm" type="submit">
								<div v-if="loading_filter">
									<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									Loading...
								</div>
								<div v-else>
									<mdb-icon icon="filter" size="lg"/> Terapkan Filter		
								</div>
							</mdb-btn>
						</mdb-col>
					</mdb-row>
				</form>
			</mdb-col>
		</mdb-row>

		<mdb-row v-if="loading_filter" class="row justify-content-center">
			<mdb-col lg="12" xs="12" sm="12">
				<b-skeleton animation="throb" width="85%"></b-skeleton>
				<b-skeleton animation="throb" width="55%"></b-skeleton>
				<b-skeleton animation="throb" width="70%"></b-skeleton>
			</mdb-col>
		</mdb-row>

		<div v-else>

			<mdb-card v-if="pelatihans.length == 0" class="card-body" style="width: 100%; margin-top: 1rem;">
				<mdb-row>
					<mdb-col lg="12" xs="12" sm="12">
						<mdb-alert color="warning" v-if="p1" @closeAlert="FilterEventChild(); p1=false" dismiss>
							<strong>Oopps!</strong> tidak ada event yang anda ikuti.
						</mdb-alert>
					</mdb-col>
				</mdb-row>
			</mdb-card>

			<mdb-card v-else v-for="(item, index) in pelatihans" class="card-body" style="width: 100%; margin-top: 1rem;" :key="item.id">
				<mdb-container>

					<mdb-row>
						<mdb-col lg="12" xs="12" sm="12">
							<mdb-card-title>{{item.kegiatan_title}}</mdb-card-title>
							<small>
								{{$moment(item.tanggal_awal).format("LL")}} - {{$moment(item.tanggal_akhir).format("LL")}}
							</small>
							
							<mdb-row class="d-flex justify-content-start">
								<mdb-col md="12">
									<blockquote class="blockquote-footer">
										{{item.kegiatan_desc}}
									</blockquote>
								</mdb-col>
								<mdb-col md="3">
									<span>Status : </span> 
								</mdb-col>
								<mdb-col md="1">
									<mdb-badge size="sm" class="badge btn-success mb-2 badge__category text-white" >{{item.status_pendaftaran_value}}</mdb-badge>
								</mdb-col>
							</mdb-row>
			
							<mdb-row>
								<mdb-col md="6">
									<h4 class="orange-text">{{$format(item.harga)}}</h4>
								</mdb-col>
							</mdb-row>
						</mdb-col>
						
						<mdb-col lg="12" xs="12" sm="12">
							<!-- <nuxt-link :to="`/detail/event/${item.kegiatan_id}/${$slug(item.kegiatan_title)}`" size="sm" class="btn btn-outline-primary font-weight-bold btn__link-event">Lihat Detail Pelatihan</nuxt-link> -->
							<nuxt-link :to="`/profile/${username}/events/${item.kegiatan_id}/${$slug(item.kegiatan_title)}`" size="sm" class="btn btn-outline-primary font-weight-bold btn__link-event">Akses Pelatihan</nuxt-link>
						</mdb-col>
					</mdb-row>
				</mdb-container>
			</mdb-card>

		</div>

	</div>
</template>

<script>
	export default{
		props: ['FilterEventChild', 'loading', 'categories', 'pelatihans', 'profiles', 'loading_filter'],
		data(){
			return {
				p1: true,
				username: this.$username(this.profiles.nama)
			}
		},

		methods: {
			ChangeMonthChild(e){
				this.$emit('change-month-child', e)
			},

			ChangeCategoryChild(e){
				this.$emit('change-category-child', e)
			}
		}
	}
</script>