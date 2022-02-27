<template>
	<div class="pre__test">
		<mdb-container v-if="save_test.user_id == profiles.id ? save_test.status : success.status" class="success__test">

			<!-- <pre>
				{{save_test}}
			</pre> -->

			<mdb-row col="12" class="row justify-content-center">
				<mdb-col lg="12">
					<mdb-alert :color="`${save_test.status ? 'info' : 'success'}`">
						Halo, {{save_test.profile.nama}}. {{save_test.message ? save_test.message :  success.message}}
					</mdb-alert>
				</mdb-col>
			</mdb-row>
		</mdb-container>
		
		<mdb-container v-else>
			<!-- <pre>
				{{lists}}
			</pre> -->
			<mdb-row  col="12" class="row justify-content-start mb-2">
				<small class="text-info">
					*.Selesaikan soal No.1 Terlebih Dahulu
				</small>
			</mdb-row>
			<mdb-row v-for="(item, index) in lists" col="12" class="row justify-content-center" :key="item.id">
				<mdb-col lg="12" class="test__content">
					<h4> Soal {{item.urutan}} </h4>
					<p> {{item.pertanyaan}} </p>
					<div class="test-answers">
						<form
						method="POST"
						class="is-not-results"
						>
						<fieldset>
							<div class="answers">
								<div
								class="answer"
								v-for="option in item.pilihans"
								:value="option.id"
								:key="option.id"
								>
								<input v-if="soal_active || item.urutan == 1"
								type="radio"
								v-model="item.id"
								:value="option.id"
								:id="option.id"
								required @change="ChangeJawaban(option.ujian_id, index, option.id, item.urutan)">

								<label
								:for="option.id"
								class="answer__item"
								>
								{{option.jawaban}}
							</label>

						</div>
					</div>
				</fieldset>
			</form>
		</div>
	</mdb-col>
</mdb-row>

<mdb-row col="12" class="row justify-content-center">
	<mdb-col lg="12">
		<div class="mb-2 ">
			<a
			href=""
			class="btn btn-primary btn-md rounded btn-block"
			@click.prevent="SubmitTest"
			>
			<div v-if="loading">
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				Loading...
			</div>
			<div v-else>
				Submit <mdb-icon far icon="paper-plane" />
			</div>
		</a>
	</div>
</mdb-col>
</mdb-row>
</mdb-container>

</div>
</template>

<script>
	export default{
		props: ['id_test', 'token', 'api_url'],

		data(){
			return {
				loading: null,
				tests: [],
				lists: [],
				field: {
					soal:[],
					jawaban:[]
				},
				success:{
					status: null,
					message: ''
				},
				save_test: {},
				soal_active: false,
				profiles: [],
				username: ''
			}
		},

		mounted(){
			this.PreTest(),
			this.UserProfileData()
		},

		methods: {

			UserProfileData(){
				if(this.token){					
					const url = `${this.api_url}/web/user`
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.profiles = data.user
						this.username = this.$username(data.user.nama)
					})
					.catch(err => console.log(err.response ? err.response : ''))
				}
			},

			PreTest(){
				this.loading = true
				const url = `${this.api_url}/web/event/1/pretest/list/${this.id_test}`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios
				.get(url)
				.then(({data}) => {
					this.lists = data.list_data
					this.tests = data
					this.field.soal = this.field.soal.length < 1 ? this.lists.map(d => d.id) : this.field.jawaban.shift()

					// this.field.jawaban = this.field.jawaban.length < 1 ? this.lists.map(d => d.jawaban) : this.field.jawaban.shift()
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.loading=false
				})
			},


			SubmitTest(){
				this.loading = true
				this.$swal({
					title: 'Apakah Anda yakin ingin mengumpulkan jawaban ?',
					html:
					`Anda telah mengisi <b>${this.field.jawaban.length}</b> dari <b>${this.field.soal.length} soal</b>`,
					showDenyButton: true,
					showCancelButton: false,
					confirmButtonText: 'Ya, Kumpulkan jawaban saya',
					denyButtonText: `Tidak`,
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						this.KirimJawaban(this.field.soal, this.field.jawaban)
					} else if (result.isDenied) {
						this.loading = false
						this.$swal('Changes are not saved', '', 'info')
					}
				})
			},

			KirimJawaban(soal, jawaban){
				const url = `${this.api_url}/web/event/1/pretest/${this.id_test}`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				// console.log(jawaban.length)
				if(jawaban.length >= 2){			
					this.$axios.post(url, {
						ujian: JSON.stringify(soal),
						jawaban: JSON.stringify(jawaban)
					})
					.then(({data}) => {
					// console.log(data)
					if(data.message == "Berhasil menyimpan hasil test"){
						this.success.message = data.message
						this.$swal(data.message, '', 'success')
					}
				})
					.catch(err => {
						this.loading = false
						this.success.status = false
						this.success.message = err.message
						console.log(err.message)
					})
					.finally(() => {
						this.success.status = true
						const save_test = localStorage.setItem(`finish-pre-test-${this.id_test}-${this.$username(this.profiles.nama)}`, JSON.stringify({status: this.success.status, user_id: this.profiles.id, message: 'Anda sudah menyelesaikan sesi pre test', profile: this.profiles}))
						this.loading = false
						this.save_test = localStorage.getItem(`finish-pre-test-${this.id_test}-${this.$username(this.profiles.nama)}`) ? JSON.parse(localStorage.getItem(`finish-pre-test-${this.id_test}-${this.$username(this.profiles.nama)}`)) : ''
						window.scrollTo(0, 0)
					})
				}else{					
					this.$swal({
						icon: 'error',
						title: 'Oops...',
						text: 'Anda belum menjawab apapun!',
					})
					this.loading = false
				}

			},

			ChangeJawaban(id_soal, position, id_jawaban, urutan){
				
				this.soal_active = urutan ? true : null
				

				if(this.field.jawaban.length > 1){
					this.field.jawaban.splice(position, 1, id_jawaban)
				}else{
					this.field.jawaban.push(id_jawaban)
				}
				console.log(this.field.jawaban)
			}
		}
	}
</script>