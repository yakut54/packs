<template>
  <img
    src="@/assets/images/back.png"
    alt="back.png"
    title="НАЗАД"
    class="back"
    @click="$router.back()"
  />
</template>

<script>
export default {
  name: 'back-button'
}
</script>

