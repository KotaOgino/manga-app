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
      <h1 class="text-center pt-10">掲載漫画一覧</h1>
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
        <h1 class="text-center py-10">おすすめ漫画</h1>
        <v-card class="my-10 recomendation" :elevation="hover ? 20 : 2">
          <!-- <router-link :to="{ name: 'series', params: {id: data.seriesId} }"> -->
          <v-row>
            <v-col cols=6>
              <v-img
              width="100%"
              :src="recData.seriesImage"
              ></v-img>
            </v-col>
            <v-col cols=6>
              <v-card-title class="mangaTitle py-10">{{ recData.title }}</v-card-title>
              <v-row
                align="center"
                class="mx-0"
              >
                <v-rating
                  :value="5.0"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="20"
                  class="pl-2 py-5"
                ></v-rating>
                <div class="grey--text ml-4">5.0 (1)</div>
              </v-row>
              <v-card-text class="recDescription py-10">
              <p>{{recData.description}}</p>
            </v-card-text>
            <v-chip class="ml-1 mt-5">出版社：{{recData.publisher}}</v-chip>
            <v-chip class="mx-5 mt-5">作者：{{recData.author}}</v-chip>
            <v-chip class="mt-5">巻数：全{{recData.volumes}}巻</v-chip>
            </v-col>
          </v-row>
          <!-- </router-link> -->
        </v-card>
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
    recData:[],
    height:'500px'
  }),
  created () {
    fetch(this.apiUrl)
    .then( response => {
      return response.json()
    })
    .then( json => {
      this.datas = json.data,
      this.recData = this.datas[1]
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
.recDescription p{
  font-size: 1rem;
  letter-spacing: .1rem;
  line-height: 200%;
}
</style>
