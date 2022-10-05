<template>
  <div class="card__list" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center header__ppkc-list-page">
        <mdb-col lg="12" xs="12" sm="12" class="text-center">
          <h2 style="font-weight: 700">Alur Pendaftaran Peserta Pelatihan</h2>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2 mt-4">
          <h5>Peserta belum memiliki Akun</h5>
          <p class="content-desc">{{ non_account }}</p>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="ppkc__col-3">
          <h5>Peserta sudah memiliki Akun</h5>
          <p class="content-desc">{{ account }}</p>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
export default {
  props: ["path", "lists", "account", "non_account"],
  data() {
    return {
      berita__list_style: this.$device.isDesktop
        ? "margin-top: 8rem;"
        : "margin-top: 6rem;",
    };
  },
};
</script>

<style scoped>
.content-desc {
  text-align: left !important;
  white-space: pre-wrap;
  font-size: 16px;
  line-height: 35px !important;
}
</style>
