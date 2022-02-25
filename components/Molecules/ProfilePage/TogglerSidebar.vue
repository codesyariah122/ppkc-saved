<template>
	<div>
		<mdb-row class="justify-content-end">
			<mdb-col col="1">
				<mdb-tooltip trigger="hover" :options="{placement: 'bottom'}">
					<span slot="tip"> Buka Menu Pelatihan </span>
					<mdb-btn id="docs-sidebar-toggler" class="toggler" gradient="blue" slot="reference" color="primary" @click="SidebarToggler">
						<mdb-icon icon="bars" size="lg"/>
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
