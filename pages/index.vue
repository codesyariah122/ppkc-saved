<template>
  <div>
    <!-- Homepage Content -->
    <!-- inside container -->
    <mdb-container>
      <mdb-row class="justify-content-center mt-5">
        <mdb-col lg="12" sm="12" xs="12">
          <HomepageHeaderCard :bg="bg_image" :items="items" />
        </mdb-col>
      </mdb-row>

      <mdb-row class="justify-content-center mt-5">
        <mdb-col lg="12" sm="12" xs="12">
          <HomepageEventList :lists="lists.list_kegiatan_terdekat" />
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <!-- End inside container -->

    <!-- out container -->
    <!-- parallax -->
    <HomepageParallaxHome />
    <!-- berita -->
    <HomepageBerita :lists="lists.list_berita" />
    <!-- Testimoni -->
    <HomepageTestimoni :lists="lists.list_testimoni" />
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

export default {
  name: "IndexPage",
  layout: "default",

  data() {
    return {
      bg_image: this.$device.isMobile ? HeroImageMobile : HeroImage,
      items: []
    }
  },

  async asyncData({ $axios }) {
    const lists = await $axios.$get("/web/home");
    return {
      lists
    }
  },

  mounted() {
    this.CarouselItem()
  },

  methods: {
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
  }
};
</script>