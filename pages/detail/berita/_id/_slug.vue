<template>
  <div class="card__list" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center header__ppkc-list-page">
        <mdb-col lg="8" xs="8" sm="8">
          <h2
            style="color: #004899 !important; font-weight: 700; font-size: 30px"
          >
            {{ lists.berita.judul }}
          </h2>
        </mdb-col>
        <mdb-col lg="12" xs="12" sm="12" style="margin-top: 8px">
          <span style="color: #666666 !important; font-size: 14px">
            {{ $moment(lists.berita.created_at).format("LL") }}
          </span>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="ppkc__col-1">
          <center>
            <img :src="lists.berita.foto_url" class="img-fluid hover-shadow" />
          </center>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2">
          <p class="content-desc">{{ lists.berita.konten }}</p>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
export default {
  name: "detail-berita-id-slug",
  layout: "default",

  data() {
    return {
      berita__list_style: this.$device.isDesktop
        ? "margin-top: 8rem;"
        : "margin-top: 6rem;",
      id: this.$route.params.id,
      path: this.$route.name,
      berita: null,
    };
  },

  async asyncData({ $axios, params }) {
    console.log("load berita");
    const lists = await $axios.$get(`/web/berita/${params.id}`);
    console.log(lists.berita);

    return {
      lists,
    };
  },
};
</script>

<style scoped>
.content-desc {
  white-space: pre-wrap;
  font-size: 16px;
}
</style>
