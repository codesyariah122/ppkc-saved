<template>
	<div>
    <!-- Testimoni content -->
    <mdb-row col="12" class="slider__testimoni">
      <mdb-col v-if="testiIndex <= lists.length" v-for="testiIndex in testiToShow" :md="`${lists.length <= 2 ? '12' : '5'}`" sm="4" xs="4" :key="lists[testiIndex-1].id" class="col__testimoni-card">
        <mdb-card class="card__testimoni-content mt-2">
          <mdb-container class="mt-4 mb-2">
            <blockquote class="post__quote"> 
              <mdb-icon icon="quote-left"/><br>
              <p class="quote__txt">
                {{lists[testiIndex-1].testimoni}}
              </p>
              <h3 class="profile__name">
               - {{lists[testiIndex-1].konsumen ? lists[testiIndex-1].konsumen : 'PPKC Visitor'}}
              </h3>
            </blockquote>
          </mdb-container>
        </mdb-card>
      </mdb-col>
    </mdb-row>

  </div>
</template>

<script>
  import DefaultProfile from  '~/assets/images/profile/user-profile.svg'

  export default{
    props: ['lists'],
    data(){
      return {
        testiToShow:4,
        profile_default: DefaultProfile,
        null_foto: null
      }
    },

    mounted(){
      this.TnsSlider()
    },
    methods: {
      TnsSlider(){
        tns({
          "container": ".slider__testimoni",
          "items": this.$device.isDesktop ? 2 : 1,
          "center": true,
          "slideBy": 'page',
          "loop": false,
          "autoplay": false,
          "speed": 400,
          "autoplayButtonOutput": false,
          "swipeAngle": true,
          "mouseDrag": true,
          "lazyload": false,
          "nav": false,
          "controls": true,
          "controlsText": ['<span class="fas fa-chevron-circle-left"></span>', '<span class="fas fa-chevron-circle-right"></span>'],
        });
      }
    }
	}
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
  color:$color-primary;
}
button[disabled]{
  color: $default-gray!important;
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
</style>