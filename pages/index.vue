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

        <mdb-col lg="12" sm="12" xs="12">
          <HomepagePanelTarget/>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <!-- End inside container -->

    <!-- out container -->
    <!-- Testimoni -->
    <HomepageTestimoni :lists="lists.list_testimoni"/>
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

  

  async asyncData({ $axios }) {
    const lists = await $axios.$get("/web/home");
    return {
      lists
    }
  },
  beforeMount(){
    this.CheckToken()
  },
  mounted() {
    this.CarouselItem(),
    this.scrollTo()
  },

  methods: {
    scrollTo(){
      const element = document.querySelector("#testimoni-list")
      element.scrollIntoView();
    },
    CheckToken(){
      this.$store.dispatch('config/checkAuthLogin', 'token')
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