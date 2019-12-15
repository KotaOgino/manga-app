<template lang="html">
  <div class="book">
    <v-container>
    <v-card class="my-10" v-for="data in datas['imageData']" v-bind:key="data.imageId">
      <v-img
      :src="data.imageUrl"
      ></v-img>
    </v-card>
    <button type="button" @click="backToSeries" aria-label="Scroll to top" title="Scroll to top" class="v-btn v-btn--bottom v-btn--contained v-btn--fab v-btn--fixed v-btn--right v-btn--round theme--dark v-size--large green" style="transform-origin: center center;"><span class="v-btn__content">戻る</span></button>
    <button type="button" @click="nextBook" aria-label="Scroll to top" title="Scroll to top" class="v-btn v-btn--bottom v-btn--contained v-btn--fab v-btn--fixed v-btn--left v-btn--round theme--dark v-size--large green" style="transform-origin: center center;"><span class="v-btn__content">次巻</span></button>
  </v-container>
  </div>
</template>

<script>

export default {

  data() {
    return {
      msg:'',
      bookUrl: 'https://wfc2-image-api-259809.appspot.com/api/books/',
      apiUrl: 'https://wfc2-image-api-259809.appspot.com/api/series/',
      datas: [],
      bookDatas: [],
      bookId: '',
      now: 0
    }
  },
  watch:{
    '$route': function (to, from) {
    if (to.path !== from.path) {
        this.fetchData(),
          // this.bookTitle(),
          fetch(this.bookUrl + this.bookId)
          .then(response => {
            return response.json()
          })
          .then(json => {
            this.datas = json
          })
          .catch((err) => {
            this.msg = err // エラー処理
          });
    }
  }
},
  mounted() {
    this.fetchData(),
      // this.bookTitle(),
      fetch(this.bookUrl + this.bookId)
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
      this.bookId = this.$route.params.bookId;
    },
    moveTop() {
      window.scrollTo(0,0)
    },
    moveToTop() {

      const duration = 500;  // 移動速度（1秒で終了）
      const interval = 25;    // 0.025秒ごとに移動
      const step = -window.scrollY / Math.ceil(duration / interval); // 1回に移動する距離
      const timer = setInterval(() => {

          window.scrollBy(0, step);   // スクロール位置を移動

          if(window.scrollY <= 0) {

              clearInterval(timer);

          }

      }, interval);
    },
    nextBook() {
      var seriesId = this.$route.params.id
      var bookId = this.bookId
      fetch(this.apiUrl + seriesId)
        .then(response => {
          return response.json()
        })
        .then(json => {
          const bookDatas = json.books;
          const now = bookDatas.findIndex(b => b.id === bookId);
          if (now !== bookDatas.length -1) {
            const nextbookId = bookDatas[now + 1].id
            this.$router.push({ name: 'book', params:{bookId:nextbookId} });
          }else{
            alert('次の巻はありません')
          }

        })
        .catch((err) => {
          this.msg = err // エラー処理
        });

    },
    backToSeries() {
      const seriesId = this.$route.params.id
      this.$router.push({ name: 'series', params:{id:seriesId} });
    }

  }
}
</script>

<style lang="css" scoped>
.book{
  background-color: #000000;
}
</style>
