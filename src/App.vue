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
        <!-- <p class="text-center" v-if="$route.name.indexOf('home') == 0">
          Top
        </p> -->
        <p v-if="$route.name.indexOf('series') == 0">
          {{mangatitle}}
        </p>
      </div>
      <v-spacer></v-spacer>
      <!-- <div class="d-flex"> -->
      <!-- <router-link to="/"> -->
        <!-- <v-menu>
        <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>ホームに戻る</v-list-item-title>
            <v-list-item-title>前のページに戻る</v-list-item-title>
            <v-list-item-title>マイページへ</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <!-- </router-link> -->
      <!-- </div> -->
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

        <!-- <v-card-text class="caImage"> -->
        <v-card-text>
          <img src="./assets/carecruit.png" width="500" alt="">
          <!-- Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running. -->
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
            @click="showContent = false"
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
// import EventBus from '../EventBus.js'

export default {
  data(){
    return{
        msg:'',
        showContent:'false',
        drawer: null,
        booktitle:'',
        mangatitle:'',
        // api:'https://wfc2-image-api-259809.appspot.com/api'
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
    // EventBus.$on('booktitle',this.getTitle)
  },
  methods:{
    getTitle: function(){
      const bookId = this.$route.params.bookId
      fetch(this.urlApi + bookId)
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
