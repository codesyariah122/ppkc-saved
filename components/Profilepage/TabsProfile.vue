<template>
	<div>
		<b-tabs content-class="mt-4" fill>
			<b-tab title="Akun" active>
				<mdb-card>
					<ProfileInfo :profiles="profiles" :studs="studs" :works="works"/>
				</mdb-card>
			</b-tab>
			<b-tab title="Event yang diikuti">
				<b-row align-h="end" class="row__form-filter">
					<b-col cols="4" class="form__filter-caption">
						Filter
					</b-col>
					<b-col cols="5" class="form__filter-profile-tabs">
						<form @submit.prevent="FilterEventChild">			
							<b-row class="d-flex justify-content-center">
								<b-col cols="4" class="select__1">
									<select selected :value="undefined" @change="ChangeCategoryChild($event)">
										<option value="">Jenis Pelatihan</option>
										<option v-for="(item, index) in categories" :value="item.code">
											{{item.value}}
										</option>
									</select>
								</b-col>
								<b-col cols="4" class="select__2">
									<select selected :value="undefined" @change="ChangeMonthChild($event)">
										<option value="">Bulan Pelatihan</option>
										<option v-for="(month, index) in $moment.months()" :value="index + 1">
											{{month}}
										</option>
									</select>
								</b-col>
								<b-col cols="4">
									<mdb-btn size="sm" type="submit">
										<div v-if="loading">
											<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
											Loading...
										</div>
										<div v-else>
											Terapkan Filter		
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

				<mdb-card v-else v-for="(item, index) in pelatihans" class="card-body" style="width: 100%; margin-top: 1rem;" :key="item.id">

					<!-- <pre>{{categories}}</pre> -->

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
										<!-- <pre>
											{{item}}
										</pre> -->
									</mdb-col>
									<mdb-col md="3">
										<span>Status : </span> 
									</mdb-col>
									<mdb-col md="1">
										<mdb-badge size="sm" class="badge btn-success mb-2 badge__category text-white" >{{item.status_pendaftaran_value}}</mdb-badge>
									</mdb-col>
								</mdb-row>
								<mdb-row class="d-flex justify-content-start mb-3">
									<!-- <br>
									<pre>
										{{categories[index].value}}
									</pre> -->
									<mdb-col md="3">
										<span>Kategori : </span> 
									</mdb-col>
									<mdb-col md="1">
										<mdb-badge size="sm" class="badge btn-primary mb-4 badge__category text-white" >{{categories[index].value}}</mdb-badge>
									</mdb-col>
								</mdb-row>
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
			</b-tab>

			<b-tab title="Sertifikat">
				<p>I'm the tab with the very, very long title</p>
			</b-tab>
		</b-tabs>
	</div>
</template>

<script>
	import ProfileInfo from '@/components/Molecules/ProfilePage/ProfileInfo'

	export default{
		props: ['profiles', 'studs', 'works', 'pelatihans', 'categories', 'loading', 'field'],
		
		components: {
			ProfileInfo
		},

		mounted(){
			console.log(this.categories)
		},

		methods: {
			FilterEventChild(){
				this.$emit('filter-event-child')
			},

			ChangeCategoryChild(e){
				this.$emit('change-category-child', e)
			},

			ChangeMonthChild(e){
				this.$emit('change-month-child', e)
			}
		}
	}
</script>