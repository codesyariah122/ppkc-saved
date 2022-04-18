<template>
  <div>
    <!-- Homepage Content -->
    <!-- inside container -->
    <mdb-container>
      <mdb-row class="justify-content-center mt-5">
        <mdb-col lg="12" sm="12" xs="12">
          <HomepageHeaderCard :bg="bg_image" :items="items" :token="token" />
        </mdb-col>
      </mdb-row>

      <mdb-row class="justify-content-center mt-5">
        <mdb-col lg="12" sm="12" xs="12">
          <HomepageEventList :lists="lists.list_kegiatan_terdekat" :listToShow="listToShow" />
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <!-- End inside container -->

    <!-- out container -->
    <!-- Testimoni -->
    <HomepageTestimoni :lists="lists.list_testimoni" :listToShow="listToShow"/>
    <!-- parallax -->
    <HomepageParallaxHome />
    <!-- berita -->
    <HomepageBerita :lists="lists.list_berita" />
    <!-- visi misi content -->
    <HomepageVisiMisi />
    <!-- End out container -->

    <!-- End Homepage Content -->
  </div>
</template>

<script>
//Image base on assets directory
import HeroImage from "~/assets/images/homepage/hero-image.svg";
import HeroImageMobile from "~/assets/images/homepage/banner.svg";
import NewHeroImage from "~/assets/images/homepage/new-hero-3.svg"

export default {
  name: "IndexPage",
  layout: "default",

  data() {
    return {
      bg_image: this.$device.isMobile ? HeroImageMobile : HeroImage,
      items: [],
      events:[],
      testimonis: [],
      news: [],
      listToShow: 2
    }
  },

  head:{
    script: [
      // {
      //   src: 'https://widget.tochat.be/bundle.js?key=93ba0156-969f-4e9c-b1c8-0c25aafde170',
      //   defer: true
      // }
      ]
    },

    async asyncData({ $axios }) {
      const lists = await $axios.$get("/web/home");
      console.log(lists)
      return {
        lists
      }
    },
    beforeMount(){
      this.CheckToken()
    },
    mounted() {
      this.CarouselItem(),
      this.EventLists(),
      this.TestimoniLists(),
      this.NewsLists()
    },

    methods: {
      CheckToken(){
        this.$store.dispatch('config/checkAuthLogin', 'token')
      },

      EventLists(keyword='', page=1, category='', month=''){
        this.loading = true
        const url = `${this.api_url}/web/event/paging?keyword=${keyword ? keyword : ''}&page=${page ? page : 1}&jenis_pelatihan=${category ? category : ''}&bulan_pelatihan=${month ? month : ''}`
        this.$axios.get(url)
        .then(({data}) => {
          this.events = data.list_kegiatan_terdekat
        })
        .catch(err => console.log(err.response))
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 1500)
        })
      },

      TestimoniLists(start=0){
        this.loading = true
        const url = `${this.api_url}/web/testimoni/page?start=${start}`
        this.$axios.get(url)
        .then(({data}) => {
          this.testimonis = data.list_data
        })
        .catch(err => console.log(err.response))
        .finally(() => {
          this.loading = false
        }, 1500)
      },

      NewsLists(start=0){
        this.loading = true
        const url = `${this.api_url}/web/berita/page?start=${start}`
        this.$axios.get(url)
        .then(({data}) => {
          this.news = data.list_data
        })
        .catch(err => console.log(err.response))
        .finally(() => {
          setTimeout(() => {
            this.loading=false
          }, 1500) 
        })
      },

      CarouselItem() {
        this.items = [
        {
          img: true,
          src: "https://api.ppkc-online.com/image-banner/banner1.jpeg",
        },
        {
          img: true,
          src: "https://api.ppkc-online.com/image-banner/banner2.jpeg",
        },
        {
          img: true,
          src: "https://api.ppkc-online.com/image-banner/banner3.jpeg",
        },
        {
          img: true,
          src: "https://api.ppkc-online.com/image-banner/banner4.jpeg",
        },
        {
          img: true,
          src: "https://api.ppkc-online.com/image-banner/banner5.jpeg",
        },
        {
          img: true,
          src: "https://api.ppkc-online.com/image-banner/banner6.jpeg",
        },
        {
          img: true,
          src: "https://api.ppkc-online.com/image-banner/banner7.jpeg",
        }
        ]
      }
    },

    computed: {
      token(){
        return this.$store.getters['config/ConfigCheckLogin']
      }
    }
  }
</script>