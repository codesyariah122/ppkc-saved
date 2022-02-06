<template>
	<div class="webinar__list">
		<mdb-jumbotron class="mb-3 mt-5 text-center lighten-5 jumbotron__event">
			<mdb-container class="mt-2">
				<h2 class="card-title h2">Events</h2>
				<p class="my-4 font-weight-bold">Temukan pelatihan dan webinar dari PPKC</p>
				<form @submit.prevent="SearchEvent">
					<mdb-row class="d-flex justify-content-center">
						<mdb-col lg="6">
							<div class="form-group has-search">
								<mdb-icon icon="search" class="form-control-feedback" />
								<input type="text" class="form-control" placeholder="Cari Pelatihan" v-model="field.keyword">
							</div>
						</mdb-col>
					</mdb-row>
					<mdb-row class="d-flex justify-content-center">
						<mdb-col md="3">
							<div class="form-group">
								<select @change="ChangeCategory($event)" v-model="field.category_id" class="browser-default custom-select">
									<option selected :value="undefined">Jenis Pelatihan</option>
									<option v-for="(item,index) in categories" :value="index+1">
										{{item.value}}
									</option>
								</select>
							</div>
						</mdb-col>
						<mdb-col md="3">
							<div class="form-group">
								<select @change="ChangeMonth($event)" v-model="field.month"  class="browser-default custom-select">
									<option selected :value="undefined">Bulan Pelatihan</option>
									<option v-for="(month, index) in $moment.months()" :value="index+1" :data-month="index+1">
										{{month}}
									</option>
								</select>
							</div>
						</mdb-col>
					</mdb-row>
					<mdb-row class="d-flex justify-content-center">
						<mdb-col lg="12">
							<mdb-btn type="submit" style="width:200px;" color="white" size="md" class="text-primary">
								<div v-if="loadingBtn">
									<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									Loading...
								</div>
								<div v-else>
									<mdb-icon icon="search"/>&nbsp; Cari
								</div>
							</mdb-btn>
						</mdb-col>
					</mdb-row>
				</form>
			</mdb-container>
		</mdb-jumbotron>

		<!-- Pagination list -->
		<mdb-container class="mt-5 mb-5">
			<mdb-row class="row justify-content-center mt-5 mb-5">
				<mdb-col lg="12" xs="12" sm="12">
					<mdb-alert color="info" class="text-center">
						Silahkan gunakan tombol halaman dibawah untuk melihat daftar event lainnya.
					</mdb-alert>
				</mdb-col>
				
				<!-- Pagination option components -->
				<mdb-pagination color="blue" md class="mt-3">
					<b-pagination 
					v-model="currentPage"
					:total-rows="lists.length"
					:per-page="listToShow"
					@change="LoadEvent" aria-controls="show-event" align="center"></b-pagination>
				</mdb-pagination>
				<mdb-col lg="12" xs="12" sm="12" class="mt-2 mb-2">
					<mdb-badge pill color="light-blue">Page : {{currentPage}}</mdb-badge>
				</mdb-col>
			</mdb-row>
		</mdb-container>
		<!-- End Pagination -->

	</div>
</template>

<script>
	export default{
		props: ['lists', 'loading', 'loadingBtn', 'listToShow','categories'],
		data(){
			return{
				field: {
					keyword:'',
					category_id: null,
					month: null
				},
				selected: undefined,
				currentPage: 1
			}
		},

		methods: {
			SearchEvent(){
				this.$emit('update-list-event', this.currentPage, this.field.keyword, this.field.category_id, this.field.month, true)
			},

			ResetForm(){
				this.field.keyword = ''
				this.field.category_id=this.selected
				this.field.month=this.selected
			},

			ChangeCategory(e){
				this.field.category_id = e.target.value
			},

			ChangeMonth(e){
				const options = e.target.options
				this.field.month= options[options.selectedIndex].getAttribute('data-month')
			},

			// load pagination
			LoadEvent(page){
				this.$emit('load-more-event', page, this.field.keyword, this.field.category_id, this.field.month)
			}
		}
	}
</script>
