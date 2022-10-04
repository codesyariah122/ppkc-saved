<style lang="scss" scoped>
.hover__image-wrap{
  position: relative;
  width: 100%;
  max-width: 400px;
  .image {
    display: block;
    width: 100%;
    height: auto;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 230px;
    width: 100%;
    opacity: 0;
    transition: .3s ease;
    background-color: rgba(205, 209, 228, 0.9);
  }

  &:hover .overlay {
    opacity: 1;
  }

  .icon {
    color: white;
    font-weight: 700;
    font-size: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }

  .fa-zoom:hover {
    color: #eee;
  }
}
</style>
<template>
  <div class="card__list" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center header__ppkc-list-page">
        <mdb-col lg="12" xs="12" sm="12" class="text-center">
          <h2 style="font-weight: 700">Fasilitas</h2>
        </mdb-col>

        <mdb-col
        v-for="(item, indx) in lists.list_data"
        :key="item.id"
        lg="12"
        xs="12"
        sm="12"
        class="ppkc__col-2 mt-2 portfolio"
        >
        <h5>{{ item.nama }}</h5>
        <mdb-row v-if="item.list_foto.length > 0" class="justify-content-start portfolio-container">
          <div v-for="(n, indxs) in item.list_foto" :key="n.id" class="col-lg-4 col-md-6 portfolio-item">
            <div class="portfolio-img">
              <img :src="n.foto_url" class="img-fluid" alt="">
            </div>
            <div class="portfolio-info">
              <mdb-btn @click="index = indxs"  class="portfolio-lightbox preview-link shadow-none" >
                <mdb-icon icon="search-plus" size="lg"/>
              </mdb-btn>
              <vue-gallery-slideshow
              :images="images"
              :index="index"
              @close="index = null"
              ></vue-gallery-slideshow>
            </div>
          </div>
        </mdb-row>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</div>
</template>

<script>
  import VueGallerySlideshow from "vue-gallery-slideshow"

  export default {
    props: ["path", "lists"],
    components: {
      VueGallerySlideshow
    },
    data() {
      return {
        images: [],
        index: null,
        berita__list_style: this.$device.isDesktop
        ? "margin-top: 8rem;"
        : "margin-top: 6rem;",
      }
    },

    mounted(){
      this.VenoBox(),
      this.setImages()
    },

    methods: {
      VenoBox(){
        new VenoBox({
          selector: '.fasilitas',
          numeration: true,
          infinigall: true,
          share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
          spinner: 'rotating-plane'
        })
      },

      setImages() {
        this.lists.list_data.map(d => {
          d.list_foto.map(d => {
            this.images.push(d.foto_url)
          })
        })
      }
    },
  }
</script>
