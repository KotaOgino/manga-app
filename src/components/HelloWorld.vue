<template>
  <div>
    <!-- <router-link to="/">Go to Home</router-link>
    <br>
    <router-link to="/about">Go to About</router-link> -->
    <router-link :to="{ name: 'series', params: {} }">
      <v-card v-for="data in datas" v-bind:key="data.seriesId" :href="apiUrl + data.seriesId">
        <v-card-title class="title">
          {{ data.title }}
        </v-card-title>
        <v-img
        :src="data.seriesImage"
        height="125"
        contain
        class="grey darken-4"
        ></v-img>
      </v-card>
    </router-link>
      <!-- {{datas}} -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
    apiUrl:'https://wfc2-image-api-259809.appspot.com/api/series/',
    boolUrl:'https://wfc2-image-api-259809.appspot.com/api/books/',
    msg:'',
    datas:[]
  }),
  created () {
    fetch(this.apiUrl)
    .then( response => {
      return response.json()
    })
    .then( json => {
      this.datas = json.data
    })
    .catch( (err) => {
      this.msg = err // エラー処理
    });
  },
  method:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
