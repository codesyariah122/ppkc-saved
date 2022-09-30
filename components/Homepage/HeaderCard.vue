<template>
    <div class="banner">
      <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      class="jumbotron__home"
      >
      <b-carousel-slide v-for="(item, index) in items"
      :img-src="item.src" :key="item.id"
      >
      <b-container v-if="$device.isDesktop && index === 0" class="container">
        <b-row>
          <b-col>
            <div class="caption__banner">
              <h2 class="display-6 text-capitalize white-text">
                Selamat datang di PPKC
              </h2>
              <p style="color: white;width: 50%;">
                Pusat Pengembangan Kesehatan Caroulus (PPKC) menyelenggarakan
                pelatihan di bidang kesehatan yang profesional, unggul dan
                berlandaskan I-CARE serta mampu berdaya saing di tingkat
                nasional.
              </p>
              <b-button v-if="!token.accessToken"
              class="my__btn-primary rounded btn-md"
              @click="$router.push({ name: 'auth-registrasi' })"
              >Daftar Sekarang</b-button
              >
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-carousel-slide>
  </b-carousel>
  </div>
</template>

<script>
export default {
  props: ["bg", "items", "token"]
}
</script>