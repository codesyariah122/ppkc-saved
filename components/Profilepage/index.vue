<template>
	<div class="profile__page mb-5">
		<mdb-container>
			<mdb-row class="row justify-content-center card__profile-page">
				<mdb-col lg="12" xs="12" sm="12">
					<b-card>
						<mdb-container>							
							<mdb-row class="d-flex justify-content-between profile__info-data">
								<mdb-col sm="6" md="4" class="col__img-profile">
									<img :src="require('~/assets/images/profile/user-profile.svg')" class="img-fluid rounded-circle"/>
								</mdb-col>
								<mdb-col sm="6" md="4" class="col__data-profile">
									<h4>{{profiles.nama}}</h4>
									<ul>
										<li> {{profiles.email}} </li>
										<li> {{profiles.phone}} </li>
									</ul>
								</mdb-col>

								<mdb-col sm="6" md="4" class="profile__options-page">
									<mdb-btn outline="primary" size="sm">
										<mdb-icon icon="edit" /> Edit Profile
									</mdb-btn>
									<mdb-btn color="deep-orange" size="sm">
										<mdb-icon icon="edit" />Logout
									</mdb-btn>
								</mdb-col>
							</mdb-row>
						</mdb-container>
					</b-card>
				</mdb-col>
			</mdb-row>

			<mdb-row class="row justify-content-center tabs__detail-profile">
				<mdb-col lg="12" xs="12" sm="12">
					<b-tabs content-class="mt-4" fill>
						<b-tab title="Akun" active>
							<mdb-card>
								<ul class="mt-3">
									<li>
										<strong class="text-primary text-uppercase font-weight-bold">Nira</strong> <br>
										<p>

										</p>
									</li>
									<li>
										<strong class="text-primary text-uppercase font-weight-bold">Pekerjaan</strong> <br>
										<p>
											<strong class="font-weight-bold">
												{{works.bidang_pekerjaan}}
											</strong>
											<small>
												{{works.nama_perusahaan}} <br>
												{{works.alamat_perusahaan}}
											</small>
										</p>
									</li>
									<li>
										<strong class="text-primary text-uppercase font-weight-bold">Pendidikan</strong> <br>
										<p>
											<strong class="font-weight-bold">
												{{studs.nama_institusi}}
											</strong> <br>
											<small>
												{{studs.jenjang_value}} - {{studs.jurusan}} <br>
												{{$moment(studs.mulai_pend).format("Y")}} - {{$moment(studs.akhir_pend).format("Y")}}
											</small>
										</p>
									</li>
									<li>
										<strong class="text-primary text-uppercase font-weight-bold">Domisili</strong> <br>
										<p>
											{{profiles.kabupaten_name}}, {{profiles.propinsi_name}}
										</p>
									</li>
								</ul>
							</mdb-card>
						</b-tab>
						<b-tab title="Event yang diikuti">
							<!-- <pre>
								{{pelatihans}}
							</pre> -->
							<b-row align-h="end" class="row__form-filter">
								<b-col cols="4" class="form__filter-caption">
									Filter
								</b-col>
								<b-col cols="5" class="form__filter-profile-tabs">
									<form @submit.prevent="FilterEvent">										
										<b-row>
											<b-col cols="4">
												<select selected :value="undefined" @change="ChangeCategory($event)">
													<option value="">Jenis Pelatihan</option>
													<option v-for="(item, index) in categories" :value="item.code">
														{{item.value}}
													</option>
												</select>
											</b-col>
											<b-col cols="4">
												<select selected :value="undefined" @change="ChangeMonth($event)">
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

							<mdb-card v-else v-for="(item, index) in pelatihans" class="card-body" style="width: 100%; margin-top: 1rem;">
								<mdb-container>
									<mdb-row>
										<mdb-col lg="12" xs="12" sm="12">
											<mdb-card-title>{{item.kegiatan_title}}</mdb-card-title>
											<small>
												{{$moment(item.tanggal_awal).format("LL")}} {{$moment(item.tanggal_akhir).format("LL")}}
											</small>
											<mdb-row class="d-flex justify-content-start">
												<mdb-col md="3">
													<span>Status : </span> 
												</mdb-col>
												<mdb-col md="1">
													<mdb-badge size="sm" class="badge btn-outline-primary mb-4 badge__category" style="color: #004899!important">{{item.status_pendaftaran_value}}</mdb-badge>
												</mdb-col>
											</mdb-row>
											<mdb-row>
												<mdb-col md="6">
													<h4 class="orange-text">{{$format(item.harga)}}</h4>
												</mdb-col>
											</mdb-row>
										</mdb-col>

										<mdb-col lg="12" xs="12" sm="12">
											<mdb-btn size="sm" outline="primary" class="font-weight-bold">Lihat Detail Pelatihan</mdb-btn>
										</mdb-col>
									</mdb-row>
								</mdb-container>
							</mdb-card>
							
						</b-tab>
						<b-tab title="Sertifikat">
							<p>I'm the tab with the very, very long title</p>
						</b-tab>
					</b-tabs>
				</mdb-col>
			</mdb-row>

		</mdb-container>
	</div>
</template>

<script>
	import {FetchData} from '@/helpers'

	export default {
		props: ['profiles', 'genders', 'studs', 'jobs', 'works', 'maritals', 'pelatihans', 'categories', 'api_url', 'empty_filter', 'loading'],

		data(){
			return {
				field: {}
			}
		},

		methods: {

			FilterEvent(){
				// console.log(this.field)
				this.$emit('load-event-follow', 1, this.field.category, this.field.month)
			},

			ChangeCategory(e){
				this.field.category = e.target.value
			},

			ChangeMonth(e){
				this.field.month = e.target.value
			}
		}
	}
</script>