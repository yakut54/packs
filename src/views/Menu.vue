<template>
	<div class="page page-menu">
		<div class="max">

			<!-- btns -->

			<div class="menu-btn" :key="item.subtitle" @click="start(idx)" :class="{ 'mt-dop': !!item.redFlagText }"
				v-for="(item, idx) in data">
				<div class="red-dop" v-html="item.redFlagText" v-if="!!item.redFlagText"></div>
				<div class="menu-btn-left"></div>
				<div class="menu-btn-center" :style="{ backgroundImage: `url(${item.imgBtn})` }"></div>
				<div class="menu-btn-right">
					<div class="text-block-797" v-html="item.titleBtn"></div>
					<div class="text-block-798" v-html="item.subtitleBtn"></div>
				</div>
			</div>

			<!-- gift btn -->

			<div class="menu-btn" v-if="isShowGiftBtn" @click="$router.push('/gift')"
				:class="{ 'mt-dop': !!giftBtn.redFlagText }">
				<div class="red-dop" v-html="giftBtn.redFlagText" v-if="!!giftBtn.redFlagText"></div>
				<div class="menu-btn-left"></div>
				<div class="menu-btn-center" :style="{ backgroundImage: `url(${giftBtn.imgBtn})` }"></div>
				<div class="menu-btn-right">
					<div class="text-block-797" v-html="giftBtn.titleBtn"></div>
					<div class="text-block-798" v-html="giftBtn.subtitleBtn"></div>
				</div>
			</div>

			<!-- link gift btn -->

			<a target="_blank" class="menu-btn" v-if="isShowGiftBtnLink" :class="{ 'mt-dop': !!linkGiftBtn.redFlagText }"
				:href="linkGiftBtn.link">
				<div class="red-dop" v-html="linkGiftBtn.redFlagText" v-if="!!linkGiftBtn.redFlagText"></div>
				<div class="menu-btn-left"></div>
				<div class="menu-btn-center" :style="{ backgroundImage: `url(${linkGiftBtn.imgBtn})` }"></div>
				<div class="menu-btn-right">
					<div class="text-block-797" v-html="linkGiftBtn.titleBtn"></div>
					<div class="text-block-798" v-html="linkGiftBtn.subtitleBtn"></div>
				</div>
			</a>

			<!-- link btn -->

			<a class="menu-btn" target="_blank" :class="{ 'mt-dop': !!btnLink.redFlagText }" :href="btnLink.link"
				v-if="isShowBtnLink">
				<div class="red-dop" v-html="btnLink.redFlagText" v-if="!!btnLink.redFlagText"></div>
				<div class="menu-btn-left"></div>
				<div class="menu-btn-center" :style="{ backgroundImage: `url(${btnLink.imgBtn})` }"></div>
				<div class="menu-btn-right">
					<div class="text-block-797" v-html="btnLink.titleBtn"></div>
					<div class="text-block-798" v-html="btnLink.subtitleBtn"></div>
				</div>
			</a>

		</div>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
	name: 'Menu',
	computed: {
		...mapState(['isEnterFromMenu', 'giftBtn', 'linkGiftBtn', 'btnLink', 'data',
			'title', 'subtitle', 'title_', 'subtitle_', 'isShowGiftBtn', 'isShowBtnLink',
			'isShowGiftBtnLink'])
	},
	methods: {
		...mapMutations(['setPageTitle', 'setPageSubtitle', 'toggleIsEnterFromMenu']),
		...mapActions(['getSeansByPageName', 'getGift_1', 'getGift_2']),

		start(idx) {
			localStorage.setItem('idx', idx)
			this.$router.push(
				this.data[idx].through
					? `/${this.data[idx].type}`
					: '/description'
			)
		}
	},
	async mounted() {
		this.toggleIsEnterFromMenu(true)
		const regexp = new RegExp(/.*\?/)
		const pageName = window.location.hash.replace(regexp, '').split('=')[1]

		if (pageName) {
			window.scrollTo(0, 0)

			await this.getSeansByPageName({
				pageName,
				callback: () => {
					this.$title(this.title)
					this.setPageTitle(this.title_)
					this.setPageSubtitle(this.subtitle_)
				}
			})

			if (!this.giftBtn.titleBtn) {
				await this.getGift_1()
				await this.getGift_2()
			}

			localStorage.setItem('pageName', pageName)
		}
	}
}
</script>