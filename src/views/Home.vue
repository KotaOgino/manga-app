<template>
  <div class="home">
    <!-- <v-carousel cycle="cycle" interval="4000" :height="height">
  <v-carousel-item
    v-for="data in datas" v-bind:key="data.seriesId"
    :src="data.seriesImage"
    reverse-transition="fade-transition"
    transition="fade-transition">
</v-carousel-item>
</v-carousel> -->
    <v-container>
      <h1 class="text-center pt-10">漫画一覧</h1>
      <v-row>
        <v-col cols=3 v-for="data in datas" v-bind:key="data.seriesId">
        <v-hover v-slot:default="{ hover }">
          <v-card class="my-10" :elevation="hover ? 20 : 2">
            <router-link :to="{ name: 'series', params: {id: data.seriesId} }">
            <v-img
            :aspect-ratio="15/20"
            :src="data.seriesImage"
            ></v-img>
          <v-expand-transition>
          <div
            v-if="hover"
            class="p-5 transition-fast-in-fast-out green v-card--reveal white--text"
            style="height: 100%;"
          >
              <span class="mangaTitle">{{ data.title }}</span>
              <br>
              <br>
              <span>{{data.description}}</span>
          </div>
        </v-expand-transition>
            </router-link>
          </v-card>
        </v-hover>
        </v-col>
        </v-row>
    </v-container>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    apiUrl:'https://wfc2-image-api-259809.appspot.com/api/series/',
    boolUrl:'https://wfc2-image-api-259809.appspot.com/api/books/',
    msg:'',
    datas:[],
    height:'500px'
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
<style lang="css" scoped>
a{
  text-decoration: none!important;
}
.mangaTitle{
  font-weight: bold;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .9;
  position: absolute;
  width: 100%;
  padding:1rem;
}
</style>
