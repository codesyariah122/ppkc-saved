<template>
	<div>
		<mdb-row class="justify-content-end">
			<mdb-col :col="`${$device.isDesktop ? 1 : 3}`">
				<mdb-tooltip trigger="hover" :options="{placement: 'bottom'}">
					<span slot="tip"> {{close_show ? 'Tutup Menu Pelatihan' : 'Buka Menu Pelatihan'}} </span>
					<mdb-btn id="docs-sidebar-toggler" class="toggler" gradient="blue" slot="reference" color="primary" @click="SidebarToggler(); close_show = !close_show;">
						<mdb-icon v-if="close_show" far icon="window-close" size="lg"/>
						<mdb-icon v-else icon="bars" size="lg"/>		
					</mdb-btn>
				</mdb-tooltip>
			</mdb-col>
		</mdb-row>
	</div>
</template>

<style lang="scss">
	.toggler{
		&:hover{
			color:$bg-fourt!important;
		}
		position: fixed;
	}
</style>

<script>
	export default{
		data(){
			return {
				close_show: false
			}
		},
		methods: {
			SidebarToggler(){
				const sidebar = document.getElementById('docs-sidebar');
				if (sidebar.classList.contains('sidebar-visible')) {
					console.log('visible');
					sidebar.classList.remove('sidebar-visible');
					sidebar.classList.add('sidebar-hidden');

				} else {
					console.log('hidden');
					sidebar.classList.remove('sidebar-hidden');
					sidebar.classList.add('sidebar-visible');
				}
			},
		}
	}
</script>
