<template>
	<div>
		<b-tabs content-class="mt-4" fill>
			<b-tab title="Akun" active>
				<mdb-card>
					<ProfileInfo :profiles="profiles" :studs="studs" :works="works"/>
				</mdb-card>
			</b-tab>
			<b-tab title="Event yang diikuti">
				<MoleculesProfilePageEventDiikuti :FilterEventChild="FilterEventChild" :loading="loading" :categories="categories" :pelatihans="pelatihans"/>
			</b-tab>

			<b-tab title="Sertifikat">
				<EventSertifikat/>
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
			console.log(this.categories ? true : false)
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