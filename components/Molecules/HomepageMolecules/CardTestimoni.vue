<template>
  <div>
    <div v-if="lists.length > 0">
      <hooper :settings="hooperSettings" class="hooper-track-x">
        <slide v-for="item in lists" :key="item.id" style="margin-right: 30px">
          <mdb-card
            class="card__testimoni-content testimoni-content mt-2"
            style="height: 100%"
          >
            <mdb-container class="mt-4 mb-2">
              <blockquote class="post__quote">
                <mdb-icon icon="quote-left" /><br />
                <p class="quote__txt">
                  {{ item.testimoni }}
                </p>
                <h3 class="profile__name profile_name">
                  -
                  {{ item.konsumen ? item.konsumen : "PPKC Visitor" }}
                </h3>
              </blockquote>
            </mdb-container>
          </mdb-card>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination
          class="hooper-pagination-x"
          slot="hooper-addons"
        ></hooper-pagination>
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

import DefaultProfile from "~/assets/images/profile/user-profile.svg";

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
      testiToShow: 4,
      profile_default: DefaultProfile,
      null_foto: null,
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
        container: ".slider__testimoni",
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
@include card_testimonial_mobile;
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
@media (min-width: 992px) {
  @include card_testimonial_desktop;
}

.hooper-track-x {
  padding-bottom: 20px;
}

.hooper-pagination-x {
  background-color: #ddd;
  border-radius: 8px;
}

.testimoni-content {
  width: 100%;
  height: 300px !important;

  .quote__txt {
    font-size: 12px !important;
    font-weight: 600;
    line-height: 27.24px;
    margin-bottom: 0;
    color: $default !important;
  }

  h3 {
    font-size: 14px !important;
  }
}

@media (min-width: 992px) {
  .testimoni-content {
    width: 100%;
    height: 300px !important;

    .quote__txt {
      font-size: 14px !important;
      font-weight: 600;
      line-height: 27.24px;
      margin-bottom: 0;
      color: $default !important;
    }

    h3 {
      font-size: 14px !important;
    }
  }
}

@media (min-width: 1200px) {
  .testimoni-content {
    width: 100%;
    height: 300px !important;

    .quote__txt {
      font-size: 18px !important;
      font-weight: 600;
      line-height: 27.24px;
      margin-bottom: 0;
      color: $default !important;
    }

    h3 {
      font-size: 18px !important;
    }
  }
}
</style>
