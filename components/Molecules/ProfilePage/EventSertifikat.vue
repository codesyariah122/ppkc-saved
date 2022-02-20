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
					{id:1, title: 'pelatihan manajemen pelayanan IGD di rumah sakit'},
					{id:2, title: 'pelatihan instruktur senam hamil dan nifas dini'},
					{id:3, title: 'pelatihan perawatan spa untuk bayi dan balita'}
				]
			}
		}
	}
</script>