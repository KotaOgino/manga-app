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
        <p class="text-center" v-if="$route.name.indexOf('book') == 0">
          {{booktitle}}
        </p>
        <!-- <p class="text-center" v-if="$route.name.indexOf('home') == 0">
          Top
        </p> -->
        <p class="text-center" v-if="$route.name.indexOf('series') == 0">
          {{mangatitle}}
        </p>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex">
      <router-link to="/">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </router-link>
      </div>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import EventBus from '../EventBus.js'

export default {
  data(){
    return{
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
      this.getTitle(),
      this.getMangaTitle()
    }
  }
  },
  mounted(){
    // this.getTitle()
    // EventBus.$on('booktitle',this.getTitle)
  },
  methods:{
    getTitle: function(){
      var bookId = this.$route.params.bookId
      fetch(this.bookUrl + bookId)
      .then( response => {
        return response.json()
      })
      .then( json => {
        this.datas = json
        this.booktitle = json.title
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
          // this.datas = json
          this.mangatitle = json.title
        })
        .catch( (err) => {
          this.msg = err // エラー処理
        });
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
</style>
