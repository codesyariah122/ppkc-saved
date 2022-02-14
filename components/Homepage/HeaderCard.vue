<template>
  <div>
    <div v-if="$device.isDesktop" class="banner">
      <mdb-carousel
        :interval="8000"
        slide
        :items="items"
        controlls
        indicators
        fade
        dark
        class="jumbotron__home"
        customClass="rounded"
      >
      </mdb-carousel>
      <b-container class="container">
        <b-row>
          <b-col>
            <div class="caption__banner">
              <h2 class="display-6 text-capitalize white-text">
                Selamat datang di PPKC
              </h2>
              <p style="color: white">
                Pusat Pengembangan Kesehatan Caroulus (PPKC) menyelenggarakan
                pelatihan di bidang kesehatan yang profesional, unggul dan
                berlandaskan I-CARE serta mampu berdaya saing di tingkat
                nasional.
              </p>
              <b-button
                class="my__btn-primary rounded"
                @click="$router.push({ name: 'auth-registrasi' })"
                >Daftar Sekarang</b-button
              >
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <!-- If Mobile using jumbotron -->
    <div v-else>
      <b-jumbotron
        class="jumbotron__home"
        :style="`background-image: url(${bg});`"
      >
        <b-container>
          <b-row>
            <b-col>
              <h2 class="display-6 text-capitalize">selamat datang di PPKC</h2>
              <p>
                Pusat Pengembangan Kesehatan Caroulus (PPKC) menyelenggarakan
                pelatihan di bidang kesehatan yang profesional, unggul dan
                berlandaskan I-CARE serta mampu berdaya saing di tingkat
                nasional.
              </p>
              <b-button
                class="my__btn-primary rounded"
                @click="$router.push({ name: 'auth-registrasi' })"
                >Daftar Sekarang</b-button
              >
            </b-col>
          </b-row>
        </b-container>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bg"],
  data() {
    return {
      items: [
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
        },
      ],
    };
  },
};
</script>

<style lang="css">
.carousel-inner {
  max-height: 500px;
}

.banner {
  position: relative;
}
.banner img {
  width: 100%;
}
.banner .container {
  z-index: 1000;
  max-width: 1000px;
  position: absolute;
  left: 0;
  right: 0;
  top: 75%;
  text-align: left;
  transform: translateY(-50%);
}
.carousel {
  border-radius: 55px 55px 55px 55px;
  overflow: hidden;
}
</style>
