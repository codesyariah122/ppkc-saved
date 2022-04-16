<template>
  <div>
    <div v-if="lists.length > 0">
      <hooper :settings="hooperSettings">
        <slide v-for="item in lists" :key="item.id" style="margin-right: 30px">
          <mdb-card class="berita mt-2" style="width: 100%; margin-right: 30px">
            <mdb-card-image
              :src="item.foto_url"
              alt="Card image cap"
              style="object-fit: cover"
            ></mdb-card-image>
            <mdb-card-body>
              <mdb-card-title class="mb-3 mt-1">{{
                item.judul
              }}</mdb-card-title>
              <nuxt-link
                :to="{
                  name: `detail-berita-id-slug`,
                  params: {
                    id: item.id,
                    slug: $slug(item.judul),
                  },
                }"
                class="mt-2 mb-2"
                color="primary"
                >Baca Selengkapnya <mdb-icon icon="arrow-right"
              /></nuxt-link>
            </mdb-card-body>
          </mdb-card>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>
    </div>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination,
} from "hooper";
import "hooper/dist/hooper.css";

export default {
  props: ["lists"],
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination,
  },

  data() {
    return {
      listsToShow: 6,
      hooperSettings: {
        itemsToShow: 2,
        centerMode: false,
      },
    };
  },
  mounted() {},
  methods: {
    TnsSlider() {
      tns({
        container: ".slider__berita",
        items: this.$device.isDesktop ? 2 : 1,
        center: true,
        slideBy: "page",
        loop: false,
        autoplay: false,
        speed: 400,
        autoplayButtonOutput: false,
        swipeAngle: true,
        mouseDrag: true,
        lazyload: false,
        speed: 400,
        nav: false,
        controls: true,
        controlsText: [
          '<span class="fas fa-chevron-circle-left"></span>',
          '<span class="fas fa-chevron-circle-right"></span>',
        ],
      });
    },
  },
};
</script>

<style lang="scss">
.tns-outer {
  position: relative;
}
[data-controls] {
  border: 0;
  padding: 0;
  font-size: 40px;
  position: absolute;
  top: 50%;
  margin-top: -18px;
  z-index: 1;
  background: transparent;
  color: $color-primary;
}
button[disabled] {
  color: $default-gray !important;
  cursor: not-allowed;
}
[data-controls="prev"] {
  left: -8px;
}
[data-controls="next"] {
  right: 5px;
}

.hooper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: auto !important;
}

.hooper-track {
  padding-bottom: 40px;
}

.berita {
  height: 300px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  h4 {
    font-size: 14px;
  }

  a {
    font-size: 14px;
  }

  img {
    height: 140px;
    width: 100%;
    object-fit: cover;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
}

@media (min-width: 992px) {
  .berita {
    height: 350px;

    h4 {
      font-size: 24px;
    }

    img {
      height: 180px;
    }
  }
}
</style>
