<template>
	<div v-if="$device.isDesktop">
		<LayoutsNavbarDesktop :token="token" :profiles="profiles" :slug="slug"/>
	</div>
	<div v-else>
		<LayoutsNavbarMobile :token="token" :profiles="profiles" :slug="slug"/>
	</div>
</template>

<script>
	export default{
		props: ['token', 'profiles', 'slug']
	}
</script>


