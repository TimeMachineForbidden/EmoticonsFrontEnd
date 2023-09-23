<template>
  <div class="home">
    <h1>emoji.com hello!!</h1>
  </div>
</template>

<script>
import Service from '@/utils/request.js'

export default {
  name: 'HomeView',
  data() {

  },
  methods: {
    async fetchcontent() {
      const res = await Service.get('/user');
      console.log(res)
    }
  },
  mounted() {
    //this.fetchcontent();
  }
}
</script>
