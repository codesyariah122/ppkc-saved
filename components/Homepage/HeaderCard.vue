
<template>
  <div class="banner">
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
            <h2 class="display-6 text-capitalize white-text">
              Selamat datang di PPKC
            </h2>
            <p style="color: white">
              Pusat Pengembangan Kesehatan Caroulus (PPKC) menyelenggarakan
              pelatihan di bidang kesehatan yang profesional, unggul dan
              berlandaskan I-CARE serta mampu berdaya saing di tingkat nasional.
            </p>
            <b-button
              class="my__btn-primary rounded"
              @click="$router.push({ name: 'auth-registrasi' })"
              >Daftar Sekarang</b-button
            >
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
export default {
  props: ["bg", "items"]
};
</script>
