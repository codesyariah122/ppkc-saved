<template>
	<div class="card__list" :style="berita__list_style">
		<mdb-container>

			<!-- header -->
			<mdb-row class="row justify-content-center header__ppkc-list-page">
				<mdb-col lg="12" xs="12" sm="12">
					<h4>Sejarah</h4>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-1">
					<center>						
						<mdb-card reverse class="card__berita-img">
							<mdb-view hover cascade>
								<a :href="lists.result.foto_url" target="_blank">
									<mdb-card-image :src="lists.result.foto_url" alt="Card image cap"></mdb-card-image>
									<mdb-mask waves overlay="white-slight"></mdb-mask>
								</a>
							</mdb-view>
						</mdb-card>
					</center>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2">
					<p class="text-justify">
						{{lists.result.description}}
					</p>
				</mdb-col>
			</mdb-row>

		</mdb-container>

	</div>
</template>

<script>
	export default{
		props: ['path', 'lists'],
		data(){
			return {
				berita__list_style: this.$device.isDesktop ? 'margin-top: 8rem;' : 'margin-top: 6rem;'
			}
		}
	}
</script>