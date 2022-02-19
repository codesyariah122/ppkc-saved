<template>
	<div>
		<b-row align-h="end" class="row__form-filter">
			<b-col cols="4" class="form__filter-caption">
				Filter
			</b-col>
			<b-col cols="5" class="form__filter-profile-tabs">
				<form @submit.prevent="FilterEventChild">			
					<b-row class="d-flex justify-content-center">
						<b-col cols="4" xs="12" sm="12" lg="12" class="select__1">
							<select selected :value="undefined" @change="ChangeCategoryChild($event)">
								<option value="">Jenis Pelatihan</option>
								<option v-for="(item, index) in categories" :value="item.code">
									{{item.value}}
								</option>
							</select>
						</b-col>

						<b-col cols="4" xs="12" sm="12" lg="12" class="select__2">
							<select selected :value="undefined" @change="ChangeMonthChild($event)">
								<option value="">Bulan Pelatihan</option>
								<option v-for="(month, index) in $moment.months()" :value="index + 1">
									{{month}}
								</option>
							</select>
						</b-col>
						<b-col cols="4" xs="12" sm="12" lg="12">
							<mdb-btn size="sm" type="submit">
								<div v-if="loading">
									<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									Loading...
								</div>
								<div v-else>
									<mdb-icon icon="filter" size="lg"/> Terapkan Filter		
								</div>
							</mdb-btn>
						</b-col>
					</b-row>
				</form>
			</b-col>
		</b-row>

		<mdb-row v-if="loading" class="row justify-content-center">
			<div class="spinner-grow text-primary mt-3" size="md" style="width: 5rem; height: 5rem; background: coral;" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</mdb-row>

		<div v-else>

			<mdb-card v-if="pelatihans.length === 0" class="card-body" style="width: 100%; margin-top: 1rem;">
				<mdb-row>
					<mdb-col lg="12" xs="12" sm="12">
						<mdb-alert color="warning" v-if="p1" @closeAlert="p1=false" dismiss>
							<strong>Oopps!</strong> Belum ada event yang anda ikuti.
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
							<!-- <mdb-row class="d-flex justify-content-start mb-3">
								<mdb-col md="3">
									<span>Kategori : </span>
								</mdb-col>
								<mdb-col md="1">
									<mdb-badge v-if="index+1" size="sm" class="badge btn-primary mb-4 badge__category text-white" >{{categories[index].value}}</mdb-badge>
								</mdb-col>
							</mdb-row> -->
							<mdb-row>
								<mdb-col md="6">
									<h4 class="orange-text">{{$format(item.harga)}}</h4>
								</mdb-col>
							</mdb-row>
						</mdb-col>

						<mdb-col lg="12" xs="12" sm="12">
							<nuxt-link :to="`/detail/event/${item.kegiatan_id}/${$slug(item.kegiatan_title)}`" size="sm" class="btn btn-outline-primary font-weight-bold btn__link-event">Lihat Detail Pelatihan</nuxt-link>
						</mdb-col>
					</mdb-row>
				</mdb-container>
			</mdb-card>

		</div>

	</div>
</template>

<script>
	export default{
		props: ['FilterEventChild', 'loading', 'categories', 'pelatihans'],
		data(){
			return {
				p1: true
			}
		}
	}
</script>