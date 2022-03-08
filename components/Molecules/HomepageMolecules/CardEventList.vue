<template>
  <div>
    <mdb-row v-if="lists.length < listsToShow" col="12" class="justify-content-center card__content">
       <mdb-col lg="12" xs="12" sm="12">
        <mdb-alert color="info">
         <mdb-icon icon="info-circle" size="lg" /> Belum ada event terdekat !
       </mdb-alert>
     </mdb-col>
   </mdb-row>
   
    <mdb-row v-else col="12" class="justify-content-center card__content">
      <!-- column event -->
      <mdb-col 
        v-if="listIndex <= lists.length"
        v-for="listIndex in listsToShow"
        md="4"
        class="mb-3"
        :key="lists[listIndex - 1].kegiatan_id"
      >
        <mdb-card>
          <mdb-view hover>
            <a
              :href="`/detail/event/${lists[listIndex - 1].kegiatan_id}/${$slug(
                lists[listIndex - 1].kegiatan_title
              )}`"
            >
              <mdb-card-image v-if="lists[listIndex - 1].photo == 'https://api.ppkc-online.com/image-kegiatans/null'" :src="require('~/assets/images/homepage/default.jpg')" alt="No image found"></mdb-card-image>
              <mdb-card-image v-else :src="lists[listIndex - 1].photo" :alt="lists[listIndex-1].kegiatan_title" class="img-fluid"/>
              <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
            </a>
          </mdb-view>
          <mdb-card-body>
            <mdb-badge
              class="badge btn-outline-primary mb-4 badge__category"
              style="color: #3393ff !important"
              >{{ lists[listIndex - 1].kategori_value }}</mdb-badge
            >

            <mdb-card-title
              class="truncate"
              style="color: #004899; font-weight: bold; min-height: 80px"
              >{{ lists[listIndex - 1].kegiatan_title }}</mdb-card-title
            >
            <mdb-card-text
              class="truncate2"
              style="width: 200px:color:#666666;min-height:45px;"
              >{{ lists[listIndex - 1].kegiatan_desc }}</mdb-card-text
            >
            <span class="mt-5" style="font-size: 12px; color: #999999"
              >{{ $moment(lists[listIndex - 1].tgl_awal).format("LL") }} -
              {{ $moment(lists[listIndex - 1].tgl_akhir).format("LL") }}</span
            >
            <br />
            <span class="mt-2 idr__color">
              {{ $format(lists[listIndex - 1].harga) }}
            </span>
            <!-- <mdb-btn @click="ToDetailEvent(lists[listIndex-1].kegiatan_id)" block class="btn btn-outline-primary mt-3 mb-2" color="primary">Detail Event</mdb-btn> -->
            <br />
            <nuxt-link
              :to="{
                name: `detail-event-id-slug`,
                params: {
                  id: lists[listIndex - 1].kegiatan_id,
                  slug: $slug(lists[listIndex - 1].kegiatan_title),
                },
              }"
              class="btn btn-outline-primary mt-3 mb-2 btn-block font-weight-bold"
              color="primary"
              >Detail Event</nuxt-link
            >
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
      
    </mdb-row>
  </div>
</template>

<script>
export default {
  props: ["lists", "listsToShow"],
};
</script>

<style lang="css">
.btn-outline-primary {
  border: 1px solid #3393ff !important;
}

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

.truncate2 {
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp, 2);
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

.card__list .card__content .card .view {
  border-radius: 8px 8px 0px 0px !important;
}
</style>
