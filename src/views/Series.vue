<template lang="html">
  <div class="manga">
    <v-container>
      <v-row>
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
  name: 'series',
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
</style>
