<template>
  <div class="card__list">
    <!-- webinar list header -->
    <div class="row justify-content-between card__header">
      <mdb-col md="5" class="mb-3">
        <h1 class="text-capitalize">
          <strong class="font-weight-bold">pelatihan dan webinar</strong>
        </h1>
      </mdb-col>
      <!-- <mdb-col md="4"></mdb-col> -->
      <mdb-col md="3" class="text-justify text-capitalize mb-5">
        <mdb-tooltip
          trigger="hover"
          :options="{ placement: 'top' }"
          :class="`${$device.isDesktop ? 'ml-4' : ''} float-right`"
        >
          <span slot="tip"> Lihat semua pelatihan dan webinar </span>
          <nuxt-link to="/events" slot="reference"
            >lihat semua pelatihan <mdb-icon icon="arrow-right"
          /></nuxt-link>
        </mdb-tooltip>
      </mdb-col>
    </div>
    <!-- End header webinar list -->

    <!-- Event webinar list content -->
    <CardEventList :lists="lists" :listsToShow="listsToShow" />
    <!-- End Event Webinar List content -->
  </div>
</template>

<script>
import CardEventList from "@/components/Molecules/HomepageMolecules/CardEventList";

export default {
  props: ["lists"],
  components: {
    CardEventList,
  },
  data() {
    return {
      listsToShow: 3,
    };
  },
};
</script>