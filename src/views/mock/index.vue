<template>
  <div>
    {{ users }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'App',
  setup() {
    const users = ref([])

    onMounted(() => {
      axios.get('/auth/login').then(res => {
        users.value = res.data.data
      })
    })
    return { users }
  }
})
</script>

<style scoped>
.mockBox {
  text-align: center;
  line-height: 40px;
}
</style>
