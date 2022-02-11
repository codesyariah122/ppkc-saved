<template>
	<div class="berita__detail mb-5">
		<mdb-container>
			<!-- Content first -->
			<mdb-row class="row justify-content-center berita__detail-content">
				<mdb-col lg="12" xs="12" sm="12" class="col__berita-1">
					<h4 class="text-capitalize text-center">{{news.berita.judul}}</h4>
					<p>{{$moment(news.berita.created_at).format("LLL")}}</p>
					<!-- Image content -->
					<center>						
						<mdb-card reverse class="card__berita-img">
							<mdb-view hover cascade>
								<a href="#!">
									<mdb-card-image :src="news.berita.foto_url" alt="Card image cap"></mdb-card-image>
									<mdb-mask waves overlay="white-slight"></mdb-mask>
								</a>
							</mdb-view>
						</mdb-card>
					</center>
				</mdb-col>
				<!-- Content paragraph berita -->
				<mdb-col lg="12" xs="12" sm="12" class="col__berita-2">
					<article>
						{{news.berita.konten}}
					</article>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="mt-5">
					<b-dropdown-divider class="line"></b-dropdown-divider>
				</mdb-col>
			</mdb-row>

			<!-- Content second -->
			<GlobalsOptionSlug :next="next"/>

		</mdb-container>
	</div>
</template>

<script>
	import {FetchData} from '@/helpers'

	export default{
		name: 'detail-berita-id-slug',
		layout: 'default',
		
		async asyncData({$axios, params}){
			console.log(typeof 	params.id)
			const next_id = parseInt(params.id) + 1
			const news =  await $axios.$get(`/web/berita/${params.id}`)
			const next = await $axios.$get(`/web/berita/${next_id}`)
			return {
				news,
				next
			}
		},

	}
</script>