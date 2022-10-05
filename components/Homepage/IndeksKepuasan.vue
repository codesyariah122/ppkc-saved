<template>
  <div class="card__list mt-lg-0" style="margin-bottom: 64px">
    <!-- webinar list header -->
    <div class="row justify-content-center card__header p-1">
      <mdb-col xs="12" sm="12" md="6">
        <div class="row p-1" style="border: 0.5px solid #ddd">
          <mdb-col>
            <div class="row p-3" style="background-color: #fcf8e3">
              <mdb-col md="12" xs="12" sm="12">
                <h5
                  class="text-capitalize"
                  :style="`${
                    $device.isDesktop ? 'font-size:21px!important;' : ''
                  }`"
                >
                  <strong class="font-weight-bold" style="color: #555555"
                    >Indeks Kepuasan Masyarakat</strong
                  >
                </h5>
              </mdb-col>

              <mdb-col md="12" xs="12" sm="12">
                <p style="color: #555555">
                  Periode Survey
                  {{ $moment(index_kepuasan.periode_dari).format("LL") }} s.d
                  {{ $moment(index_kepuasan.periode_sampai).format("LL") }}
                </p>
              </mdb-col>

              <mdb-col md="12" xs="12" sm="12">
                <h5
                  class="text-capitalize"
                  :style="`${
                    $device.isDesktop ? 'font-size:21px!important;' : ''
                  }`"
                >
                  <strong class="font-weight-bold" style="color: #555555"
                    >Nilai: {{ index_kepuasan.nilai }} ({{
                      index_kepuasan.nilai_sebut
                    }})</strong
                  >
                </h5>
              </mdb-col>

              <mdb-col md="12" xs="12" sm="12">
                <p style="color: #555555">
                  Jumlah Responden : {{ index_kepuasan.jumlah_responden }} Orang
                </p>
              </mdb-col>
            </div>
          </mdb-col>
        </div>
      </mdb-col>
    </div>

    <!-- End header webinar list -->
  </div>
</template>

<script>
export default {
  props: ["index_kepuasan"],
  components: {},
};
</script>
