<template>
  <div>
    <!-- Testimoni content -->
    <mdb-row class="row justify-content-center col__testimoni">
      <mdb-col v-for="listIndex in listToShow" md="6" xs="12" sm="12" class="col__testimoni-card" :key="lists[listIndex-1].id">
        <mdb-card class="card__testimoni-content">
          <mdb-container class="mt-3">
            <mdb-row>
              <mdb-col md="4" class="avatar">
                <b-avatar variant="none" border-variant="none" v-if="lists[listIndex-1].foto_url !== null" :src="`https://api.ppkc-online.com/image-testimoni/${lists[listIndex-1].foto_url}`" size="6rem"></b-avatar>
                <b-avatar variant="none" border-variant="none" v-else :src="require('~/assets/images/profile/profile.svg')" size="6rem"></b-avatar>
              </mdb-col>
            </mdb-row>
            <mdb-row>
              <mdb-card-body>
                <mdb-card-title>{{lists[listIndex-1].konsumen}}</mdb-card-title>
                <h6>{{lists[listIndex-1].profesi}}</h6>
                <mdb-card-text>{{lists[listIndex-1].testimoni}}</mdb-card-text>
              </mdb-card-body>
            </mdb-row>
          </mdb-container>
        </mdb-card>
      </mdb-col>

    </mdb-row>

  </div>
</template>

<script>
import DefaultProfile from "~/assets/images/profile/user-profile.svg";

export default {
  props: ["lists", "listToShow"],
  data() {
    return {
      profile_default: DefaultProfile,
      null_foto: null,
    }
  }
}
</script>