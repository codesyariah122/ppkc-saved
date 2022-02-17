<template>
	<div class="pre__test">
		<mdb-container v-if="save_test.status ? save_test.status : success.status" class="success__test">
			<mdb-row col="12" class="row justify-content-center">
				<mdb-col lg="12">
					<mdb-alert :color="`${save_test.status ? 'info' : 'success'}`">
						{{save_test.message ? save_test.message :  success.message}}
					</mdb-alert>
				</mdb-col>
			</mdb-row>
		</mdb-container>
		
		<mdb-container v-else>
			<!-- <pre>
				{{lists}}
			</pre> -->
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
										<input
										type="radio"
										v-model="item.id"
										:value="option.id"
										:id="option.id"
										required @change="ChangeJawaban(item.id, item.jawaban)"
										>
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
				save_test: localStorage.getItem(`finish-test-${this.id_test}`) ? JSON.parse(localStorage.getItem(`finish-test-${this.id_test}`)) : ''
			}
		},

		mounted(){
			this.PreTest()
		},

		methods: {
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

					this.field.jawaban = this.field.jawaban.length < 1 ? this.lists.map(d => d.jawaban) : this.field.jawaban.shift()
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.loading=false
				})
			},


			SubmitTest(){
				this.loading = true
				this.$swal({
					title: 'Apakah sudah yakin dengan jawaban anda?',
					showDenyButton: true,
					showCancelButton: false,
					confirmButtonText: 'Save',
					denyButtonText: `Don't save`,
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

				if(jawaban.length > 2){				
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
						const save_test = localStorage.setItem(`finish-test-${this.id_test}`, JSON.stringify({status: this.success.status, message: 'Anda sudah menyelesaikan sesi pre test'}))
						this.loading = false
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

			ChangeJawaban(id_soal, id_jawaban){
				// console.log(this.field.jawaban.length)
				this.field.soal.push(id_soal)
				if(this.field.jawaban > 1){
					this.field.jawaban.shift()
				}else{
					this.field.jawaban.push(id_jawaban)
				}
			}
		}
	}
</script>