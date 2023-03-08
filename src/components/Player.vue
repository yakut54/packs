<template>
	<div class="player">

		<teleport to=".teleport" v-if="isMounted && $route.name === 'video'">
			<div class="play-button" v-if="!isPlay">
				<i class="fa fa-play-circle-o" @click="play"></i>
			</div>
		</teleport>

		<div class="left-player">
			<div class="inner-left-player">
				<i class="fa fa-play-circle-o" @click="play" v-if="!isPlay"></i>
				<i class="fa fa-pause-circle-o" @click="pause" v-else></i>
			</div>
		</div>
		<div class="center-player">
			<div class="inner-center-player">
				<div class="center-player-top">
					<div ref="scale" class="scale-bar" @mouseover="onMouseover" @mouseleave="onMouseleave"
						@mousemove="onMousemove($event)" @click="rewind($event)">
						<div class="fill-scale-bar" :style="{ width: `${progress}%` }">
							<div class="fill-scale-info-block" :style="{ left: infoBlockLeft, display: infoBlockView }">
								<div class="scale-info-block">{{ passedInfo }}</div>
								<div class="scale-info-triangle"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="center-player-bottom">
					<div class="left-bottom">
						{{ setTime(current, duration) }} / {{ setTime(duration, duration) }}
					</div>
					<div class="right-bottom">

						<!-- Volume -->

						<div class='volume'>
							<i class="fa fa-volume-off"></i>
							<div class='volume-elements'>

								<div v-for="(_, indx) in 30" :key="indx" class='volume-item' :style="{
									backgroundColor:
										indx < volumePercent
											? `rgb(${indx * 8.5}, ${0}, ${0})`
											: 'rgb(140, 140, 140)'
								}"></div>

							</div>
							<div class='volume-cover'>
								<div class='volume-cover-left' @click="mute">
									<div class='slash' v-if="isMuted"></div>
								</div>
								<div ref="volume" @click="onClickVolume" class='volume-cover-right'></div>
							</div>
						</div>

						<!-- /Volume -->

					</div>
				</div>
			</div>
		</div>
		<div class="right-player">
			<div class="inner-rigth-player">
				<a :href="src" target="_blank" class="fa fa-download"></a>
			</div>
		</div>
		<span class="flare"></span>
	</div>
</template>

<script>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'

export default {
	name: 'Player',
	props: ['player', 'src'],
	setup(props) {
		let PLAYER = ref()
		const scale = ref()
		const volume = ref()
		const current = ref(0)
		const duration = ref(0)
		const progress = ref(0)
		const currentTime = ref(0)
		const volumePercent = ref(18)
		const tempVolumePercent = ref(18)
		const passedInfo = ref('')
		const infoBlockLeft = ref('')
		const infoBlockView = ref('none')
		const isPlay = ref(false)
		const isMuted = ref(false)
		const isMounted = ref(false)

		const play = () => {
			PLAYER.value?.play()
			isPlay.value = true
		}

		const pause = () => {
			PLAYER.value?.pause()
			isPlay.value = false
		}

		const progressUpdate = () => {
			if (PLAYER.value) {
				current.value = PLAYER.value.currentTime
				progress.value = 100 * current.value / duration.value
			}
		}

		const onClickVolume = (e) => {
			const width = parseInt(getComputedStyle(volume.value).width)
			const offsetX = e.offsetX
			const percent = (100 * offsetX) / width
			volumePercent.value = tempVolumePercent.value = (30 * percent) / 100
			if (PLAYER.value)
				PLAYER.value.volume = percent / 100

			if (isMuted.value && PLAYER.value) {
				PLAYER.value.muted = false
				isMuted.value = false
			}
		}

		const rewind = (e) => {
			const width = parseInt(getComputedStyle(scale.value).width)
			const passed = e.offsetX
			progress.value = 100 * passed / width
			if (PLAYER.value) {
				PLAYER.value.pause()
				PLAYER.value.currentTime = duration.value * (passed / width)
				if (isPlay.value) {
					PLAYER.value.play()
				}
			}
		}

		const onMouseover = () => {
			if (document.documentElement.clientWidth > 800) {
				infoBlockView.value = 'block'
			}
		}

		const onMouseleave = () => {
			infoBlockView.value = 'none'
		}

		const onMousemove = (e) => {
			const width = parseInt(getComputedStyle(e.target).width)
			const passed = e.offsetX + 1
			const percent = 100 * passed / width
			const progress = duration.value / 100 * percent
			infoBlockLeft.value = `${e.offsetX - 20}px`
			passedInfo.value = setTime(progress, progress)
		}

		const mute = () => {
			isMuted.value = !isMuted.value
			if (isMuted.value) {
				volumePercent.value = 0
			} else {
				volumePercent.value = tempVolumePercent.value
			}
			if (PLAYER.value)
				PLAYER.value.muted = isMuted.value
		}

		const setTime = (t, d) => {
			const digit = (n) => (n < 10 ? `0${n}` : `${n}`)
			const sec = digit(Math.floor(t % 60))
			const min = digit(Math.floor((t / 60) % 60))
			const hr = digit(Math.floor(t / 3600) % 60)

			if (d < 3600) {
				return min + ':' + sec
			} else {
				return hr + ':' + min + ':' + sec
			}
		}

		onMounted(() => {

			PLAYER.value = props.player()
			// hanging events
			PLAYER.value.onloadeddata = () => {
				if (PLAYER.value) {
					duration.value = PLAYER.value.duration
					isMounted.value = true
				}
			}
			PLAYER.value.onended = () => {
				progress.value = 0
				currentTime.value = 0
				isPlay.value = false
			}
			PLAYER.value.onplay = () => isPlay.value = true
			PLAYER.value.ontimeupdate = () => progressUpdate()


		})

		onBeforeMount(() => {
			if (PLAYER.value)
				PLAYER.value.ontimeupdate = null
		})

		onBeforeUnmount(() => {
			PLAYER.value?.pause()
      PLAYER = {}
		})

		return {
			onMouseleave, onMousemove, onMouseover, rewind,
			play, pause, setTime, mute, onClickVolume, volume, scale,
			isMuted, isPlay, isMounted, current, duration, passedInfo,
			progress, volumePercent, infoBlockLeft, infoBlockView
		}
	}
}
</script>

<style>
.player {
	background-color: #c09d52;
	background-image: linear-gradient(2deg, #c09d52, #d8cd96 49%, #c09d52 103%);
	display: flex;
	justify-content: center;
	width: 100%;
	height: 60px;
	border-radius: 8px;
	position: relative;
	box-shadow: -2px 0px 7px 0px #fff, 1px 1px 3px 0 #02282f;
}

.left-player,
.right-player {
	flex: 1;
	max-width: 55px;
	display: flex;
	justify-content: center;
	align-items: stretch;
}

.left-player,
.right-player,
.center-player {
	padding: 5px;
}

.left-player {
	padding-right: 0;
}

.right-player {
	padding-left: 0;
}

.center-player {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.inner-left-player,
.inner-center-player,
.inner-rigth-player {
	border: 1px dashed #565657;
	border-radius: 8px;
	flex: 1;
}

.inner-left-player,
.inner-rigth-player {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.inner-left-player *,
.inner-rigth-player * {
	font-size: 43px;
	cursor: pointer;
	transition: 0.1s;
	color: black;
}

.inner-rigth-player * {
	font-size: 35px;
}

.inner-left-player *:hover,
.inner-rigth-player *:hover {
	transform: scale(0.96);
}

.inner-center-player {
	display: flex;
	flex-direction: column;
}

.flare {
	position: absolute;
	top: 0;
	height: 60px;
	width: 45px;
	transform: skewX(-45deg);
	animation: flareAnimation;
	left: -150%;
	background: linear-gradient(90deg,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0.4));
	animation: flareAnimation 2s linear;
}

@keyframes flareAnimation {
	0% {
		left: -150%;
	}

	100% {
		left: 150%;
	}
}

.center-player-top {
	flex: 2;
	padding: 7px 5px 2px;
}

.center-player-bottom {
	flex: 3;
	padding: 0 6px 0px;
	display: flex;
}

.scale-bar {
	width: 100%;
	background: #000;
	cursor: pointer;
	box-shadow: -1px 1px 1px #000;
}

.fill-scale-bar {
	background: #c8dbf5;
	width: 30%;
	position: relative;
}

.scale-bar,
.fill-scale-bar {
	height: 12px;
}

.left-bottom {
	flex: 1;
	display: flex;
	align-items: center;
	font-size: 16px;
}

.right-bottom {
	flex: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.fill-scale-info-block {
	position: absolute;
}

.scale-info-block {
	position: absolute;
	background: #08074b;
	border: 1px solid #d7dbdc;
	height: 18px;
	width: 40px;
	font-size: 12px;
	color: #d7dbdc;
	top: -29px;
	left: 0;
	z-index: 2;
	border-radius: 2px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.scale-info-triangle {
	width: 0;
	height: 0;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 8px solid #d7dbdc;
	position: absolute;
	top: -14px;
	left: 15px;
}


.volume {
	display: flex;
	align-items: center;
	cursor: pointer;
	position: relative;
}

.volume i {
	font-size: 26px;
	color: #000;
	margin-right: 1px;
}

.volume-elements {
	display: flex;
	align-items: center;
	width: 120px;
}

.volume-item {
	width: 2px;
	margin-left: 2px;
}

.volume-item,
.volume-elements {
	height: 18px;
}

.volume-cover {
	position: absolute;
	height: 18px;
	width: 133px;
	display: flex;
}

.volume-cover-left {
	flex: 1;
	max-width: 12px;
	position: relative;
}

.volume-cover-right {
	flex: 1;
}

.slash {
	position: relative;
	transform: rotate(-115deg);
	top: 8px;
	left: -4px;
	height: 2px;
	width: 21px;
	background: rgb(221, 65, 65);
}

@media (max-width: 900px) {
	.player {
		overflow: hidden;
	}
}

@media (max-width: 500px) {

	.left-player,
	.right-player {
		max-width: 45px;
	}

	.inner-left-player *,
	.inner-rigth-player * {
		font-size: 35px;
	}

	.inner-rigth-player * {
		font-size: 30px;
	}

	.left-player,
	.right-player,
	.center-player {
		padding: 3px;
	}

	.player,
	.flare {
		height: 57px;
	}
}

@media (max-width: 360px) {

	.left-player,
	.right-player {
		max-width: 40px;
	}

	.inner-left-player *,
	.inner-rigth-player * {
		font-size: 30px;
	}

	.inner-rigth-player * {
		font-size: 25px;
	}

	.player,
	.flare {
		height: 49px;
	}

	.center-player-top {
		padding: 4px 4px 1px;
	}

	.inner-left-player,
	.inner-center-player,
	.inner-rigth-player {
		border-radius: 5px;
	}

	.scale-bar,
	.fill-scale-bar {
		height: 10px;
	}

	.left-bottom {
		font-size: 14px;
	}

	.volume-elements {
		width: 90px;
	}

	.volume-cover {
		width: 103px;
	}

	.volume-item {
		width: 1px;
	}

	.volume-elements {
		height: 16px;
	}

	.left-bottom {
		font-size: 13px;
	}

	.volume {
		font-size: 24px;
	}
}

@media (max-width: 320px) {
	.left-player {
		padding-right: 1px;
	}

	.right-player {
		padding-left: 1px;
	}

	.left-player,
	.right-player {
		max-width: 34px;
	}

	.inner-left-player * {
		font-size: 26px;
	}

	.audio-block {
		padding-left: 3px;
		padding: 3px;
	}

	.player {
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.video-bottom .player {
		margin-top: 0px;
		margin-bottom: 0px;
	}

	.center-player-bottom {
		padding: 0 6px 0px 4px;
	}
}
</style>