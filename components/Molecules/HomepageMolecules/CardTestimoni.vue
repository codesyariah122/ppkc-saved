<template>
	<div>
    <!-- Testimoni content -->
    <mdb-row col="12" class="slider__testimoni">
      <mdb-col v-if="testiIndex <= lists.length" v-for="testiIndex in testiToShow" md="5" :key="lists[testiIndex-1].id" class="col__testimoni-card">
        <mdb-card class="card__testimoni-content">
          <mdb-container class="mt-4 mb-2">
            <blockquote class="post__quote"> 
              <mdb-icon icon="quote-left"/><br>
              <p class="quote__txt">
                {{lists[testiIndex-1].testimoni}}
              </p>
              <h3 class="profile__name">
                {{lists[testiIndex-1].konsumen ? lists[testiIndex-1].konsumen : 'PPKC Visitor'}}
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
        testiToShow: 6,
        profile_default: DefaultProfile,
        null_foto: null,
        default_dua:'https://i.imgur.com/RCwPA3O.jpg'
      }
    },

    mounted(){
      this.TnsSlider()
    },
    methods: {
      TnsSlider(){
        tns({
          "container": ".slider__testimoni",
          "items": 2,
          "center": true,
          "slideBy": 'page',
          "loop": false,
          "swipeAngle": true,
          "mouseDrag": true,
          "speed": 400,
          "nav": false,
          "controls": false,
        });
      }
    }
	}
</script>

<style lang="scss">
@include card_testimonial_mobile;

@media (min-width: 992px) {
  @include card_testimonial_desktop;
}
</style>