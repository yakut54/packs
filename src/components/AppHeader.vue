<template>
	<header >
		<div class="max960">
			<div class="div-block-384">
				<div class="heading-97" v-html="title"></div>
				<div class="text-block-1053" v-html="subtitle"></div>
			</div>
		</div>
	</header>
	
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'app-header',
	computed: {
		...mapState(['title', 'subtitle'])
	}
}
</script>
