<template>
  <div class="berita__detail" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center berita__detail-content">
        <mdb-col lg="12" xs="12" sm="12" class="col__berita-1">
          <h2 class="text-capitalize">{{ lists.berita.judul }}</h2>
          <p>{{ $moment(lists.berita.created_at).format("LLL") }}</p>
          <!-- Image content -->
          <img :src="lists.berita.foto_url" />
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="col__berita-2">
          <div class="content-desc" v-html="lists.berita.konten"></div>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="mt-5">
          <b-dropdown-divider class="line"></b-dropdown-divider>
        </mdb-col>
      </mdb-row>

      <!-- Content second -->
      <!-- <GlobalsOptionSlug :next="next" /> -->
    </mdb-container>
  </div>
</template>

<script>
import { SampleNews } from "@/helpers";

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
      id_berita: this.$route.params.id,
      detail: {},
    };
  },

  async asyncData({ $axios, params }) {
    const lists = await $axios.$get(`/web/berita/${params.id}`);
    console.log(lists);
    const next_id = parseInt(params.id) + 1;
    const next = await $axios.$get(`/web/berita/${next_id}`);
    console.log(next);
    return {
      lists,
      next,
    };
  },

  beforeMount() {
    this.ConfigApiUrl();
  },

  methods: {
    ConfigApiUrl() {
      const api_url = process.env.NUXT_ENV_API_URL;
      this.$store.dispatch("config/storeConfigApiUrl", api_url);
    },

    DetailBeritaSample() {
      this.detail = SampleNews.filter((d) => d.id == this.id_berita)[0];
    },
  },

  computed: {
    api_url() {
      return this.$store.getters["config/ConfigApiUrl"];
    },
  },
};
</script>

