<template>
	<header class="header fixed-top">	    
		<div class="branding docs-branding">
			<div class="container-fluid position-relative py-2">
				<div class="docs-logo-wrapper">
					<button id="docs-sidebar-toggler" class="docs-sidebar-toggler docs-sidebar-visible me-2 d-xl-none" type="button" @click="SidebarToggler">
						<span></span>
						<span></span>
						<span></span>
					</button>
					<div class="site-logo mt-2">
						<nuxt-link to="/">
							<MoleculesLayoutMoleculesBrand />
						</nuxt-link>
					</div>    
				</div><!--//docs-logo-wrapper-->
				<div class="docs-top-utilities d-flex justify-content-end align-items-center">

					<ul class="social-list list-inline mx-md-3 mx-lg-5 mb-0 d-none d-lg-flex">
						<li class="list-inline-item"><a href="#"><i class="fab fa-github fa-fw"></i></a></li>
						<li class="list-inline-item"><a href="#"><i class="fab fa-twitter fa-fw"></i></a></li>
						<li class="list-inline-item"><a href="#"><i class="fab fa-slack fa-fw"></i></a></li>
						<li class="list-inline-item"><a href="#"><i class="fab fa-product-hunt fa-fw"></i></a></li>
					</ul><!--//social-list-->
					<a href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/coderdocs-free-bootstrap-5-documentation-template-for-software-projects/" class="btn btn-primary d-none d-lg-flex">Download</a>
				</div>
			</div>
		</div>
	</header>
</template>


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
			}
		}
	}
</script>