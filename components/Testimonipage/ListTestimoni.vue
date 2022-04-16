<template>
  <div>
    <div
      ref="testimoni_square"
      class="card__list testimoni__list"
      :style="berita__list_style"
    >
      <mdb-container>
        <!-- header -->
        <mdb-row class="row justify-content-center header__ppkc-list-page">
          <mdb-col lg="12" xs="12" sm="12" style="">
            <h2 style="color: #004899 !important; font-weight: 700">
              Testimoni
            </h2>
          </mdb-col>
          <mdb-col lg="6" xs="6" sm="6" style="margin-top: 8px">
            <span style="color: #666666 !important; font-size: 14px">
              PPKC telah melakukan berbagai macam pelatihan dan telah banyak
              membantu meningkatkan kemampuan tenaga kesehatan
            </span>
          </mdb-col>
        </mdb-row>

        <!-- show card berita -->
        <mdb-row col="12" class="row justify-content-center mb-5 mt-5">
          <mdb-col
            v-for="item in lists"
            lg="8"
            xs="12"
            sm="12"
            :key="item.id"
            class="col__testimoni-card"
          >
            <mdb-card class="card__testimoni-content mb-3">
              <mdb-container class="mt-2">
                <blockquote class="post__quote">
                  <mdb-icon icon="quote-left" size="lg" /><br />
                  <span class="quote__txt">
                    {{ item.testimoni }}
                  </span>
                  <h3 class="profile__name">- {{ item.konsumen }}</h3>
                </blockquote>
              </mdb-container>
            </mdb-card>
          </mdb-col>
        </mdb-row>

        <mdb-row v-if="loading" class="row justify-content-center">
          <mdb-col lg="12" xs="12" sm="12">
            <div class="d-flex justify-content-center mt-5 mb-5">
              <div
                class="spinner-grow text-primary"
                role="status"
                style="width: 3rem; height: 3rem"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row
          v-if="error"
          class="row justify-content-center header__ppkc-list-page"
        >
          <mdb-col lg="12" xs="12" sm="12">
            <button type="button" @click="LoadTestimoni" class="btn btn-info">
              Load More
            </button>
          </mdb-col>
        </mdb-row>
      </mdb-container>
    </div>
  </div>
</template>

<script>
export default {
  props: ["path", "lists", "loading", "error", "end"],
  data() {
    return {
      currentPage: 1,

      berita__list_style:
        this.$router.path == "/ppkc/berita" && this.$device.isDeskktop
          ? "margin-top: 15rem;"
          : "margin-top: 7rem;",
    };
  },

  mounted() {
    this.getNextTestimoni();
  },

  methods: {
    LoadTestimoni() {
      this.$emit("load-more-testi");
    },

    getNextTestimoni() {
      window.onscroll = () => {
        if (
          !this.loading &&
          !this.end &&
          !this.error &&
          this.$route.path == "/ppkc/testimoni"
        ) {
          if (
            this.$refs.testimoni_square.getBoundingClientRect().bottom <= 450
          ) {
            this.$emit("load-more-testi");
          }
        } else {
          console.log("else");
        }
      };
    },
  },
};
</script>
<style lang="scss">
@include card_testimonial_mobile;

@media (min-width: 992px) {
  @include card_testimonial_desktop;
}
</style>
