<template>
  <div>
    <hr class="mt-5">
    <mdb-container  v-if="status_pendaftaran !== 'Menunggu Konfirmasi' &&status_pendaftaran !== 'Daftar'" :class="`${$device.isDesktop ? 'mt-5' : ''}`">
      <mdb-row class="justify-content-center mt-2 mb-5">
        <mdb-col lg="12" col="12">
          <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
            <span slot="tip"> Kembali ke halaman profile</span>
            <nuxt-link :to="`/profile/${profiles}`" class="btn__tooltip" slot="reference">
              <mdb-icon icon="arrow-left" />
              Kembali ke profile
            </nuxt-link>
          </mdb-tooltip>
        </mdb-col>
      </mdb-row>

      <!-- Detail pelatihan boxed -->
      <mdb-row class="row justify-content-center pelatihan__box">
        <mdb-col col="4" md="4" class="nav__event-pelatihan">
          <div v-for="(item, index) in pelatihans" :key="item.id">
            <b-button v-b-toggle="`collapse-${item.id}`" class="btn__pelatihan">
              <mdb-row class="row justify-content-between">
                <mdb-col md="6">  
                  {{item.id == 1 ? item.title : `Pelatihan ${item.id}`}} 
                </mdb-col>
                <mdb-col md="1">
                  <mdb-icon icon="plus-circle" size="lg"/>
                </mdb-col>
              </mdb-row>
            </b-button>

            <b-collapse :id="`collapse-${item.id}`" class="collapse__category-event-1">
              <div v-for="(c, index) in item.categories"  :key="c.id">
                <b-button v-b-toggle="`collapse-${c.id}-inner`" size="sm" class="btn__category-1">
                  <mdb-row class="row justify-content-between">
                    <mdb-col md="5">
                      <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
                        <span slot="tip"> {{c.title}} </span>
                        <a slot="reference">Kategori {{index+1}}</a>
                      </mdb-tooltip>
                    </mdb-col>
                    <mdb-col md="1">
                       <mdb-icon icon="caret-down" size="lg"/>
                    </mdb-col>
                  </mdb-row>
                </b-button>

                <b-collapse :id="`collapse-${c.id}-inner`" class="collapse__category-event-2 mb-3">
                  <div v-for="(d, index) in c.details" :key="d.id" class="list__modul">
                    <mdb-btn v-b-toggle="`collapse-${d.id}-pelatihan`" size="sm" class="btn__category-2"  @click="ToggleFile(d.kategori, d.id)">
                      <mdb-row class="row justify-content-between">
                        <mdb-col md="6">
                          {{d.kategori !== 3 && d.kategori !== 4 ? d.title : `Test ${index}`}}
                        </mdb-col>
                        <mdb-col md="2">
                          <mdb-icon icon="caret-down" size="lg"/>
                        </mdb-col>
                      </mdb-row>
                    </mdb-btn>

                    <b-collapse :id="`collapse-${d.id ? d.id : ''}-pelatihan`" class="collapse__category-event-3">
                      <b-card>
                        <b-list-group class="list__modul">
                          <b-list-group-item id="navbar__event-detail">
                            <small class="text-sucess mb-5">
                              Click tombol / link kategori dibawah untuk membuka {{d.kategori !== 3 && d.kategori !== 4 ? d.title : `Test ${index}`}} :
                            </small> <br> <br>

                            <a class="font-weight-bold btn btn-danger" v-if="d.kategori == 1" :href="`#item-${d.kategori}`" @click="ShowField(d, '', 'video', d.kategori)">
                              <div v-if="loading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                              </div>
                              <div v-else>
                                <mdb-icon icon="video" /> Buka Video
                              </div>
                            </a>

                            <a class="font-weight-bold btn btn-info" v-else-if="d.kategori == 2" :href="`#item-${d.kategori}`" @click="ShowField(d, '', 'file_pdf', d.kategori)">
                              <div v-if="loading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                              </div>
                              <div v-else>
                                <mdb-icon far icon="file-pdf" /> Buka Materi PDF
                              </div>
                            </a>

                            <a class="font-weight-bold btn btn-success" v-else-if="d.kategori == 3" :href="`#item-${d.kategori}`" @click="ShowField(d, d.id, 'pre test', d.kategori)">
                              <div v-if="loading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                              </div>
                              <div v-else>
                                <mdb-icon far icon="file-alt" /> Pre Test {{d.title}}
                              </div>
                            </a>

                            <a class="font-weight-bold btn btn-success" v-else-if="d.kategori == 4" :href="`#item-${d.kategori}`" @click="ShowField(d, d.id, 'post test', d.kategori)">
                              <div v-if="loading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                              </div>
                              <div v-else>
                                <mdb-icon icon="file-signature" /> Post Test {{d.title}}
                              </div>
                            </a>

                            <a class="font-weight-bold btn btn-info" v-else-if="d.kategori == 5" :href="`#item-${d.kategori}`" @click="ShowField(d, '', 'file_pdf', d.kategori)">
                              <div v-if="loading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                              </div>
                              <div v-else>                                
                                <mdb-icon icon="file-signature" /> Buka Informed Consent
                              </div>
                            </a>

                            <a class="font-weight-bold btn btn-secondary" v-else-if="d.kategori == 6" :href="`#item-${d.kategori}`" @click="ShowField(d, d.id, 'video', d.kategori)">
                              <div v-if="loading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                              </div>
                              <div v-else>
                                <mdb-icon far icon="file-video" /> Buka Webinar
                              </div>
                            </a>

                          </b-list-group-item>
                        </b-list-group>
                      </b-card>
                    </b-collapse>

                  </div>
                </b-collapse>
              </div>
            </b-collapse>
          </div>
        </mdb-col>

        <mdb-col col="8" md="8" class="content__event-pelatihan mt-3">
          <div v-if="loading">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status" style="width:150px; height:150px;">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <!-- Show file event -->
          <div v-else>
            <div v-if="show_file" data-spy="scroll" data-target="#navbar__event-detail" data-offset="0">

              <div v-if="type == 1" :id="`#item-${type}`" class="embed__file">
                <h5 class="type__name">{{type_name}}</h5>
                <h2>{{detailed_data.title}}</h2>
                <div v-if="yt_link" class="mt-5 mb-5">
                  <div class="text-center">
                    <div class="spinner-grow text-danger" style="width: 5rem; height: 5rem;" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  </div>
                </div>
                <div v-else>
                  <b-embed 
                  type="iframe"
                  aspect="16by9"
                  :src="detailed.video"
                  allowfullscreen 
                  ></b-embed>
                </div>
              </div>

              <div v-else-if="type == 2" :id="`#item-${type}`" class="embed__file">
                <h5 class="type__name">{{type_name}}</h5>
                <h2>{{detailed_data.title}}</h2>
                <object :data="detailed.file_pdf" type="application/pdf" width="100%" :height="`${$device.isDesktop ? '800px' : '500px'}`">
                </object>
              </div>

              <div v-else-if="type == 3" :id="`#item-${type}`" class="embed__file">
                <EventTestPreTest :id_test="id_test" :type_name="type_name"/>
              </div>

              <div v-else-if="type == 4" :id="`#item-${type}`" class="embed__file">
                <EventTestPostTest :id_test="id_test" :type_name="type_name"/>
              </div>

              <div v-else-if="type == 5" class="embed__file">
                <h5 class="type__name">{{type_name}}</h5>
                <h2>{{detailed_data.title}}</h2>

                <pre>
                  {{categories}}
                </pre>

                <object :data="detailed.file_pdf" type="application/pdf" width="100%" :height="`${$device.isDesktop ? '800px' : '500px'}`">
                </object>

                <mdb-list-group class="mt-5">
                  <mdb-list-group-item>Cras justo odio</mdb-list-group-item>
                </mdb-list-group>

              </div>

              <div v-else-if="type == 6" :id="`#item-${type}`">
                <EventWebinar :id_test="id_test" :detailed_data="detailed_data"/>
              </div>

            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    
    <!-- debuging -->
    <!-- <pre class="mt-5">
      {{events}}
    </pre> -->
    <!-- <pre class="mt-5">
      {{pelatihans}}
    </pre> -->
  </div>
</template>


<script>
  export default{
    props: ['token', 'api_url', 'status_pendaftaran'],

    data(){
      return {
        loading: null,
        yt_link: null,
        profiles: [],
        pelatihans: [],
        kegiataan: [],
        categories:[],
        category_title: '',
        detailed_data: {},
        detailed: '',
        type: '',
        tgl: '',
        start: '',
        end: '',
        show_file:false,
        id_test: '',
        type_name: ''
      }
    },

    mounted(){
      this.EventAktif(),
      this.UserProfileData()
    },

    methods: {
      // Event Aktif Yang Diikuti
      EventAktif(){
        this.loading = true
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
        this.$axios.get(`${this.api_url}/web/event/${this.$route.params.id}`)
        .then(({data}) => {
          // console.log(data)
          this.kegiatan = data.kegiatan
          this.pelatihans = data.pelatihans
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.loading=false
        }, 900)
      },

      ToggleFile(category='', id_kategori=''){
        
        if(this.show_file){
          this.show_file = false
        }


        this.ShowCategory(id_kategori)
        // console.log(this.show_file)
      },

      ShowCategory(id){
        const string_class = `collapse-${id}-pelatihan`
        const filter = this.pelatihans.filter(d => d.id == id)
        this.categories = filter.map(c => {
          return c.categories.filter(f => f.pelatihan_id == id)
        })
        // this.categories  = filter
      },

      ShowField(raw, id_kategori='', field, type){
        this.loading = true
        this.show_file = true
        this.detailed_data = raw
        this.detailed = Object.keys(raw)
        .filter(key => field.includes(key))
        .reduce((obj, key) => {
          obj[key] = raw[key];
          // console.log(obj)
          return obj;
        }, {});

        const format_yt  = this.detailed.video ? this.$ytString(this.detailed.video) : ''

        this.yt_link = format_yt  == 'https://www.youtube.com/embed/' ? true : false
        this.type = type

        this.FileType(type)

        this.id_test = id_kategori

        setTimeout(() => {
          this.loading = false
        }, 900)

        setTimeout(() => {
          this.yt_link=false
        }, 5500)

        // console.log(this.detailed);
      },

      FileType(type){
        switch(type){
          case 1:
          this.type_name = 'Video Materi';
          break;
          case 2:
          this.type_name = 'File Materi'
          break;
          case 3:
          this.type_name = 'Pre Test'
          break;
          case 4:
          this.type_name = 'Post Test'
          break;
          case 5:
          this.type_name = 'File'
          break;
          case 6:
          this.type_name = 'Video Webinar'
          break;
          default:
          this.type_name = 'No type here'
        }
      },

      UserProfileData(){
        if(this.token){         
          const url = `${this.api_url}/web/user`
          this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
          this.$axios.get(url)
          .then(({data}) => {
            this.profiles = this.$username(data.user.nama)
          })
          .catch(err => console.log(err.response ? err.response : ''))
        }
      }
    }
  }
</script>
