<template>
  <main>
    <Spinner />
    <slot/>
  </main>
</template>
<script setup lang="ts">
import Spinner from "~/components/simple/Spinner.vue";
</script>