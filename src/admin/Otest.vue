<template>
  <img :src="img" alt="book-img" class="book-img" />
  <a target="_blank" class="button" :href="src">ЧИТАТЬ</a>
</template>

<script>

export default {
  name: "O",
  props: ['src', 'img'],
}
</script>