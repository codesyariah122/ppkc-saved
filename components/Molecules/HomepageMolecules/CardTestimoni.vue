<template>
	<div>
    <!-- Testimoni content -->
    <mdb-row>
      <!-- <pre>
        {{lists}}
      </pre> -->
      <mdb-col v-if="testiIndex <= lists.length" v-for="testiIndex in testiToShow" col="12" md="6" :key="lists[testiIndex-1].id">
        <mdb-card class="card__testimoni-content">
          <mdb-container class="mt-2 mb-2">
            <blockquote class="post__quote"> 
              <mdb-icon icon="quote-left"/><br>
              <span class="quote__txt">
                {{lists[testiIndex-1].testimoni}}
              </span>
              <p class="profile__name">
                {{lists[testiIndex-1].konsumen ? lists[testiIndex-1] : 'PPKC Visitor'}}
              </p>
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
        testiToShow: 2,
        profile_default: DefaultProfile,
        null_foto: null,
        default_dua:'https://i.imgur.com/RCwPA3O.jpg'
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