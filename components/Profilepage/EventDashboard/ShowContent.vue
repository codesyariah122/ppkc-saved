<template>
  <div v-if="type == 1" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="primary" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section mt-2" id="item-1-1">
      <div v-if="link_yt">
        <center>
          <b-progress
            :max="max"
            height="2rem"
            :striped="true"
            show-progress
            :animated="true"
            class="mb-3"
          >
            <b-progress-bar :value="value" variant="success">
              <h5 v-if="value > 0" class="text-white">Loading</h5>
            </b-progress-bar>
          </b-progress>
          <b-col cols="12" class="mt-3">
            <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
          </b-col>
        </center>
      </div>
      <div v-else>
        <EventpageVideoSection :video="detailed.video" />
      </div>
    </section>
  </div>

  <div v-else-if="type == 2" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="primary" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section mt-2" id="item-1-1">
      <mdb-alert
        v-if="
          detailed.file_pdf == 'https://api.ppkc-online.com/file-pelatihan/null'
        "
        color="danger"
      >
        Not found!
      </mdb-alert>
      <div v-else class="">
        <div v-if="loading">
          <center>
            <div class="d-flex justify-content-center">
              <b-col lg="12" xs="12" sm="12" cols="12">
                <b-spinner class="text-info" style="width: 6rem; height: 6rem;" label="Large Spinner" type="grow"></b-spinner>
                <br> 
                <blockquote>Loading ..</blockquote>
              </b-col>
            </div>
          </center>
        </div>
        <pdf v-else
          :src="pdfdata"
          v-for="i in numPages"
          :key="i"
          :id="i"
          :page="i"
          :scale.sync="scale"
          style="width: 100%; margin: 20px auto"
          :annotation="false"
          :text="true"
          :resize="true"
          @link-clicked="handle_pdf_link"
        >
        </pdf>
      </div>
    </section>
  </div>

  <div v-else-if="type == 3" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="success" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EventTestPreTest
        :id_test="id_test"
        :type_name="type_name"
        :token="token"
        :api_url="api_url"
        :pelatihans="pelatihans"
        :details="details"
        :username="username"
      />
    </section>
  </div>

  <div v-else-if="type == 4" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="success" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EventTestPostTest
        :id_test="id_test"
        :type_name="type_name"
        :token="token"
        :api_url="api_url"
        :pelatihans="pelatihans"
        :username="username"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :details="details"
        :evaluasi="evaluasi"
      />
    </section>
  </div>

  <div v-else-if="type == 5" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="primary" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section mt-2" id="item-1-1">
      <mdb-alert
        v-if="
          detailed.file_pdf == 'https://api.ppkc-online.com/file-pelatihan/null'
        "
        color="danger"
      >
        Not found!
      </mdb-alert>

      <div v-else class="embed-responsive embed-responsive-1by1">
        <div v-if="loading">
          <center>
            <div class="d-flex justify-content-center">
              <b-col lg="12" xs="12" sm="12" cols="12">
                <b-spinner class="text-info" style="width: 6rem; height: 6rem;" label="Large Spinner" type="grow"></b-spinner>
                <br> 
                <blockquote>Loading ..</blockquote>
              </b-col>
            </div>
          </center>
        </div>
        <pdf v-else
          :src="pdfdata"
          v-for="i in numPages"
          :key="i"
          :id="i"
          :page="i"
          :scale.sync="scale"
          style="width: 100%; margin: 20px auto"
          :annotation="false"
          :text="true"
          :resize="true"
          @link-clicked="handle_pdf_link"
        >
        </pdf>
      </div>
    </section>
  </div>

  <div v-else-if="type == 6" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="info" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section mt-2" id="item-1-1">
      <EventWebinar
        :id_webinar="id_webinar"
        :token="token"
        :api_url="api_url"
        :profiles="profiles"
        :details="details"
      />
    </section>
  </div>

  <div v-else-if="type == 7" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <h5 class="type__name">Evaluasi</h5>
        <h2>Evaluasi Fasilitator</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EvaluasiFasilitator
        :id_test="id_test"
        :type_name="type_name"
        :token="token"
        :api_url="api_url"
        :pelatihans="pelatihans"
        :username="username"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :details="details"
        :evaluasi="evaluasi"
      />
    </section>
  </div>

  <div v-else-if="type == 8" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <h5 class="type__name">Evaluasi</h5>
        <h2>Evaluasi Penyelenggaraan</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EvaluasiPenyelenggaraan
        :id_test="id_test"
        :type_name="type_name"
        :token="token"
        :api_url="api_url"
        :pelatihans="pelatihans"
        :username="username"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :details="details"
        :evaluasi="evaluasi"
      />
    </section>
  </div>

  <div v-else-if="type == 9" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <h5 class="type__name">Evaluasi</h5>
        <h2>Evaluasi Pasca Kegiatan</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EvaluasiPascaKegiatan
        :id_test="id_test"
        :type_name="type_name"
        :token="token"
        :api_url="api_url"
        :pelatihans="pelatihans"
        :username="username"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :details="details"
        :evaluasi="evaluasi"
      />
    </section>
  </div>
  <div v-else-if="type == 10" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <h5 class="type__name">Evaluasi</h5>
        <h2>Rencana Tindak Lanjut</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EventTestTableRTL
        :token="token"
        :api_url="api_url"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :tests="tests"
        :evaluasi="evaluasi"
      />
    </section>
  </div>
  <div v-else-if="type == 11" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <h5 class="type__name">Absensi</h5>
        <h2>Absensi Pelatihan</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EventTestAbsensi
        :token="token"
        :api_url="api_url"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :tests="tests"
        :evaluasi="evaluasi"
        :max="max"
        :value="value"
      />
    </section>
  </div>
</template>

<script>
import pdf from "pdfvuer";

export default {
  components: {
    pdf,
  },
  data() {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: [],
      scale: "page-width",
      loading: null
    };
  },
  mounted() {
    if (this.type == 2 || this.type == 5) {
      this.getPdf();
    }
  },
  
  methods: {
    handle_pdf_link: function (params) {
      var page = document.getElementById(String(params.pageNumber));
      page.scrollIntoView();
    },

    getPdf() {
      var self = this;
      self.pdfdata = pdf.createLoadingTask(this.detailed.file_pdf);
      self.pdfdata
      .then((pdf) => {
        this.loading = true;
        console.log("load page 1");
        self.numPages = pdf.numPages;
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      });
    },
    findPos(obj) {
      if (obj) return obj.offsetTop;
      else return null;
    },
  },
  props: [
    "type",
    "type_name",
    "detailed",
    "detailed_data",
    "details",
    "profiles",
    "pelatihans",
    "api_url",
    "token",
    "value",
    "max",
    "id_test",
    "id_webinar",
    "username",
    "link_yt",
    "kegiatan_id",
    "pelatihan_id",
    "evaluasi",
  ],
};
</script>
