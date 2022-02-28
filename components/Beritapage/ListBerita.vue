<template>
  <div>
    <div ref="berita_square" class="card__list" :style="berita__list_style">
      <mdb-container>
        <mdb-row class="row justify-content-center header__ppkc-list-page">
          <mdb-col lg="12" xs="12" sm="12" style="margin-top: 32px">
            <h2 style="color: #004899 !important; font-weight: 700">Berita</h2>
          </mdb-col>
          <mdb-col lg="12" xs="12" sm="12" style="margin-top: 8px">
            <span style="color: #666666 !important; font-size: 14px">
              Ikuti semua kegiatan dan berita dari PPKC
            </span>
          </mdb-col>
        </mdb-row>
        <!-- delay looping data with loader spinner -->

        <!-- show card berita -->
        <mdb-row class="row justify-content-center mb-5 webinar__content">
          <!-- List berita inside global-components -->
          <mdb-col lg="12" xs="12" sm="12">
            <div class="card__list">
              <div class="mt-5 card__content">
                <mdb-row>
                  <mdb-col
                    id="show-event"
                    v-for="item in lists"
                    md="4"
                    xs="12"
                    sm="12"
                    :key="item.id" :style="`${$device.isMobile ? 'margin-bottom: 2rem;' : ''}`"
                  >
                    <mdb-card>
                      <div class="event__image-wrap">
                        <mdb-card-image :src="item.foto_url" alt="Card image cap"></mdb-card-image>
                        <div class="overlay__event-img">
                          <a :data-gall="item.foto_url" :href="item.foto_url" class="lists-berita icon" :title="item.judul">
                            <mdb-icon icon="search-plus" />
                          </a>
                        </div>
                      </div>
                      <mdb-card-body>
                        <mdb-card-title
                          class="truncate"
                          style="padding-top: 16px; min-height: 100px"
                          >{{ item.judul }}</mdb-card-title
                        >
                        <nuxt-link
                          :to="{
                            name: `detail-berita-id-slug`,
                            params: {
                              id: item.id,
                              slug: $slug(item.judul),
                            },
                          }"
                          class="mb-2"
                          color="primary"
                          >Baca Selengkapnya <mdb-icon icon="arrow-right"
                        /></nuxt-link>
                      </mdb-card-body>
                    </mdb-card>
                  </mdb-col>
                </mdb-row>
              </div>
            </div>
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
            <button type="button" @click="LoadBerita" class="btn btn-info">
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
  props: ["lists", "loading", "error", "end"],
  data() {
    return {
      currentPage: 1,

      berita__list_style:
        this.$router.path == "berita" && this.$device.isDeskktop
          ? "margin-top: 15rem;"
          : "margin-top: 5rem;",
    };
  },

  mounted() {
    this.getNextBerita(),
    this.VenoBox()
  },

  methods: {
    LoadBerita() {
      this.$emit("load-more-berita")
    },

    getNextBerita() {
      window.onscroll = () => {
        if (!this.loading && !this.end && !this.error) {
          if (this.$refs.berita_square.getBoundingClientRect().bottom <= 450) {
            this.$emit("load-more-berita");
          }else{
            console.log("out")
          }
        }
      }
    },

    VenoBox(){
      new VenoBox({
        selector: '.lists-berita',
        numeration: true,
        infinigall: true,
        share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
        spinner: 'rotating-plane'
      })
    }
  }
}
</script>

<style lang="css">
.truncate {
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp, 3);
  -webkit-box-orient: vertical;
  word-break: var(--word-break, "none");
  overflow: hidden;
  hyphens: auto;
  text-align: var(--align, left);

  --is-single-line: 1 - Clamp(0, Calc(var(--line-clamp) - 1), var(--line-clamp));
  --delay: Calc(-1s * (var(--is-single-line, 1) - 1));
  animation: states 1s var(--delay) paused;

  @keyframes states {
    0% {
      word-break: break-all;
    }
  }
}
</style>
