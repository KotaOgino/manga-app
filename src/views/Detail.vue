<template lang="html">
  <div class="detail">
    <v-container>
      <v-card class="my-10 recomendation">
        <v-row>
          <v-col cols=6>
            <v-img
            width="100%"
            :src="datas.seriesImage"
            ></v-img>
          </v-col>
          <v-col cols=6>
            <v-card-title class="mangaTitle py-10">{{ datas.title }}</v-card-title>
            <v-card-text class="recDescription py-10">
            <p>{{datas.description}}</p>
          </v-card-text>
          <v-chip class="ml-1 mt-5">出版社：{{datas.publisher}}</v-chip>
          <v-chip class="mx-5 mt-5">作者：{{datas.author}}</v-chip>
          <v-chip class="mt-5">巻数：全{{datas.volumes}}巻</v-chip>
          </v-col>
        </v-row>
      </v-card>
      <h1>{{ datas.title }}（全{{datas.volumes}}巻）</h1>
      <v-row class="">
      <v-col cols=3 v-for="data in datas['books']" v-bind:key="data.id">
      <v-hover v-slot:default="{ hover }">
        <v-card class="my-10" :elevation="hover ? 20 : 2">
            <router-link :to="{ name: 'book', params: {bookId: data.id } }">
            <v-img
            :aspect-ratio="15/20"
            :src="data.image"
            ></v-img>
            <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out display-1 green v-card--reveal white--text"
              style="height: 100%;"
            >
                <span class="mangaTitle">{{ data.title }}</span>
            </div>
          </v-expand-transition>
            </router-link>
          </v-card>
        </v-hover>
        </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data: () => ({
    apiUrl: 'https://wfc2-image-api-259809.appspot.com/api/series/',
    msg: '',
    datas: [],
    seriesId: ''
  }),
  mounted() {
    this.fetchData(),
      fetch(this.apiUrl + this.seriesId)
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.datas = json
      })
      .catch((err) => {
        this.msg = err // エラー処理
      });
  },
  methods: {
    fetchData() {
      this.seriesId = this.$route.params.id;
    }
  }
}
</script>

<style lang="css" scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .9;
  position: absolute;
  width: 100%;
  text-align: center;
}
.recomendation .mangaTitle{
  font-size: 1.5rem;
  font-weight: bold;
}

</style>
