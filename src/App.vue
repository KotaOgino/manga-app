<template>
  <v-app>
    <!-- ヘッダー -->
    <v-app-bar
      app
      color="green"
      dark
    >
      <div class="d-flex align-center py-10">
        <router-link to="/" class="cymanga">
        AbeManga
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <p v-if="$route.name.indexOf('book') == 0">
          {{booktitle}}
        </p>
        <p v-if="$route.name.indexOf('series') == 0">
          {{mangatitle}}
        </p>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
    <template>
  <v-row justify="center">
    <v-dialog
      v-model="showContent"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline"><span class="tention">2021年度新卒採用エンジニアコース</span><br><span class="tention">本選考START！</span></v-card-title>
        <v-card-text>
          <img src="./assets/carecruit.png" width="550" alt="">
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="showContent = false"
          >
            興味がない
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            href="https://www.cyberagent.co.jp/careers/special/engineer2021/?utm_source=caec&utm_medium=slack&utm_campaign=dm"
            target="_blank"
          >
            詳細はこちら
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  data(){
    return{
        msg:'',
        showContent:'false',
        drawer: null,
        booktitle:'',
        mangatitle:'',
        apiUrl: 'https://wfc2-image-api-259809.appspot.com/api/series/',
        bookUrl:'https://wfc2-image-api-259809.appspot.com/api/books/',
        datas:[]
    }
  },
  watch:{
    '$route': function (to, from) {
    if (to.path !== from.path) {
          if (this.$route.name.indexOf('book') == 0) {
              this.getTitle()
          }
          if (this.$route.name.indexOf('series') == 0) {
              this.getMangaTitle()
          }
    }
  }
  },
  mounted(){
    this.adBanner()
    if (this.$route.name.indexOf('book') == 0) {
        this.getTitle()
    }
    if (this.$route.name.indexOf('series') == 0) {
        this.getMangaTitle()
    }
  },
  methods:{
    getTitle: function(){
      const bookId = this.$route.params.bookId
      fetch(this.bookUrl + bookId)
      .then( response => {
        return response.json()
      })
      .then( json => {
        this.datas = json
        this.booktitle = this.datas.title
      })
      .catch( (err) => {
        this.msg = err // エラー処理
      });
    },
      getMangaTitle: function(){
        var mangaId = this.$route.params.id
        fetch(this.apiUrl + mangaId)
        .then( response => {
          return response.json()
        })
        .then( json => {
          this.datas = json
          this.mangatitle = this.datas.title
        })
        .catch( (err) => {
          this.msg = err // エラー処理
        });
      },
    adBanner: function(){
      this.showContent = true
    },
    closeModal: function(){
      this.showContent = false
    }
  }
};
</script>
<style lang="css" scoped>
.cymanga{
  font-size: 2rem!important;
  font-weight: bold!important;
  font-style: italic;
}
.v-application a[data-v-7ba5bd90] {
  font-size: 0.875rem;
  font-weight: normal;
}
.v-application p{
  margin: 0!important;
  font-weight: bold;
}
.v-application a{
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}
.headline{
  margin: 0 auto;
}
.tention{
  line-height: 200%;
  font-size: 2rem;
  color: #088A08;
  font-weight: bold;
  margin: 0 auto;
}
</style>
