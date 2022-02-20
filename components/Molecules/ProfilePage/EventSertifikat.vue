<template>
	<div>
		<mdb-row cols="12" class="justify-content-end filtering__form-data">
			<mdb-col md="2">
				<h4>Filter</h4>
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
								<div v-if="loading">
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
		<mdb-row v-if="loading" class="row justify-content-center">
			<div class="spinner-grow text-primary mt-3" size="md" style="width: 5rem; height: 5rem; background: coral;" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</mdb-row>

		<mdb-row v-else>
			<mdb-card v-if="sertifikats.length === 0" class="card-body" style="width: 100%; margin-top: 1rem;">
				<mdb-row>
					<mdb-col lg="12" xs="12" sm="12">
						<mdb-alert color="warning" v-if="p1" @closeAlert="p1=false" dismiss>
							<strong>Oopps!</strong> Belum ada event yang anda ikuti.
						</mdb-alert>
					</mdb-col>
				</mdb-row>
			</mdb-card>

			<mdb-card v-else v-for="(item, index) in sertifikats" class="card-body" style="width: 100%; margin-top: 1rem;" :key="item.id">
				<mdb-row>
					<mdb-col lg="12" xs="12" sm="12">
						<mdb-card-title>{{item.title}}</mdb-card-title>
						<small class="mt-2">
							{{$moment(item.date_start).format("LL")}} - {{$moment(item.date_end).format("LL")}}
						</small>
					</mdb-col>
					<mdb-col lg="12" xs="12" sm="12">
						<mdb-btn size="sm" outline="primary"><mdb-icon icon="download" /> Unduh Sertifikat</mdb-btn>
					</mdb-col>
				</mdb-row>
			</mdb-card>

		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['categories', 'loading', 'FilterEventChild'],

		data(){
			return {
				sertifikats: []
			}
		},

		mounted(){
			this.SampleSertifikatData()
		},

		methods: {
			SampleSertifikatData(){
				this.sertifikats = [
					{id:1, title: 'pelatihan manajemen pelayanan IGD di rumah sakit', date_start: new Date(2022, 11, 24, 10, 33, 30, 0), date_end: new Date(2018, 11, 24, 10, 33, 30, 0)},
					{id:2, title: 'pelatihan instruktur senam hamil dan nifas dini', date_start: new Date(2022, 11, 24, 10, 33, 30, 0), date_end: new Date(2018, 11, 24, 10, 33, 30, 0)},
					{id:3, title: 'pelatihan perawatan spa untuk bayi dan balita',date_start: new Date(2022, 11, 24, 10, 33, 30, 0), date_end: new Date(2018, 11, 24, 10, 33, 30, 0)}
				]
			}
		}
	}
</script>