<template>
  <div class="berita__detail" :style="berita__list_style">
    <mdb-container>
      <mdb-row class="row justify-content-center berita__detail-content">
        <mdb-col lg="12" xs="12" sm="12" class="mb-3">
          <mdb-btn @click="$router.go(-1)" color="danger" class="rounded-pill">
            <mdb-icon icon="angle-left" size="lg" /> Kembali Ke Profile 
          </mdb-btn>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="col__berita-1">
          <h2 class="text-capitalize">Data Diri</h2>
        </mdb-col>

        <mdb-col sm="6" md="4" class="justify-content-center col__img-profile">
          <img
          v-if="profiles.photo !== 'https://api.ppkc-online.com/image-profiles/function File() {\r\n    [native code]\r\n}'"
          :src="profiles.photo"
          class="mx-auto d-block rounded-circle"
          width="200"
          height="200"
          alt=""
          style="object-fit: cover"
          />
          <!-- <img
          v-else
          :src="require('~/assets/images/Avatar/avatar.jpg')"
          class="img-fluid rounded-circle"
          width="400"
          height="400"
          /> -->
          <b-avatar  v-else
          variant="primary"
          :text="profiles.nama.charAt(0)"
          size="8rem"
          ></b-avatar>
          <p class="text-center mt-3">
            <a href="#" class="edit-photo" title="Ganti foto">
              <input
              type="file"
              placeholder="Ganti foto"
              @change="previewFiles"
              />
              Ganti Foto
            </a>
          </p>
        </mdb-col>
      </mdb-row>

      <mdb-row class="mt-5">
        <div class="col-md-6">
          <div class="form-group">
            <label for="no">No Anggota</label>
            <input
            type="text"
            class="form-control"
            id="input_no_anggota"
            autofocus
            v-model="profiles.no_anggota"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Alamat Email</label>
            <input
            type="text"
            class="form-control"
            id="input_nama_ktp"
            v-model="profiles.email"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">No Telphone</label>
            <input
            type="text"
            class="form-control"
            id="input_nama_ktp"
            v-model="profiles.phone"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Nama KTP</label>
            <input
            type="text"
            class="form-control"
            id="input_nama_ktp"
            v-model="profiles.nama"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Tempat Lahir</label>
            <input
            type="text"
            class="form-control"
            id="input_nama_ktp"
            v-model="profiles.tempat_lahir"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">No KTP</label>
            <input
            type="text"
            class="form-control"
            id="input_nama_ktp"
            v-model="profiles.no_ktp"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Tanggal Lahir</label>
            <input
            type="date"
            class="form-control"
            id="input_nama_ktp"
            v-model="profiles.tanggal_lahir"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">No STR</label>
            <input
            type="text"
            class="form-control"
            id="input_nama_ktp"
            v-model="profiles.str"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Masa Berlaku</label>
            <input
            type="date"
            class="form-control"
            id="input_nama_ktp"
            v-model="profiles.masa_berlaku"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Propinsi</label>
            <select
            class="form-control"
            id="sel1"
            v-model="profiles.propinsi_id"
            @change="changePropinsi($event)"
            >
            <option
            v-for="item in propinsi"
            v-bind:value="item.id"
            v-bind:key="item.id"
            >
            {{ item.nama }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label for="nama">Kabupaten</label>
        <select
        class="form-control"
        id="sel1"
        v-model="profiles.kabupaten_id"
        >
        <option
        v-for="item in filteredPropinsi"
        v-bind:value="item.id"
        v-bind:key="item.id"
        >
        {{ item.nama }}
      </option>
    </select>
  </div>
</div>
<div class="col-md-6">
  <div class="form-group">
    <label for="nama">Alamat Lengkap</label>
    <textarea type="text"
    class="form-control"
    id="input_nama_ktp"
    v-model="profiles.address"></textarea>
  </div>
</div>
</mdb-row>

<mdb-row class="mt-3">
  <div class="col-md-12 col-sm-12">
    <h5><strong>Personal Information</strong></h5>
  </div>
  <div class="col-md-6 mt-3">
    <div class="form-group">
      <label for="gender">Jenis Kelamin</label>
      <select
      class="form-control"
      id="sel1"
      v-model="profiles.jenis_kelamin_id"
      >
      <option
      v-for="gender in profiles.jenisKelamins"
      v-bind:value="gender.id" v-bind:key="gender.id"
      >
      {{ gender.value }}
    </option>
  </select>
</div>
</div>
<div class="col-md-6 mt-3">
  <div class="form-group">
    <label for="gender">Status Pekerjaan</label>
    <select
    class="form-control"
    id="sel1"
    v-model="profiles.status_pekerjaan_id"
    >
    <option
    v-for="work in profiles.statusPekerjaans"
    v-bind:value="work.id" v-bind:key="work.id"
    >
    {{ work.value }}
  </option>
</select>
</div>
</div>
<div class="col-md-6 mt-3">
  <div class="form-group">
    <label for="gender">Nama Golongan</label>
    <select
    class="form-control"
    id="sel1" v-model="profiles.golongan_pekerjaan_id"
    >
    <option v-for="golongan in profiles.golongan" v-bind:key="golongan.code" v-bind:value="golongan.id">
      {{golongan.value}}
    </option>
  </select>
</div>
</div>
<div class="col-md-6 mt-3">
  <div class="form-group">
    <label for="gender">Agama</label>
    <select
    class="form-control"
    id="sel1"
    v-model="profiles.agama_id"
    >
    <option
    v-for="agama in profiles.religions"
    v-bind:value="agama.code" v-bind:key="agama.code"
    >
    {{ agama.value }}
  </option>
</select>
</div>
</div>
</mdb-row>

<mdb-row class="row justify-content-center berita__detail-content">
  <mdb-col lg="12" xs="12" sm="12" class="col__berita-1">
    <button type="button" class="btn btn-primary btn-block rounded-pill mt-5" @click.prevent="simpan">
      Simpan
    </button>
  </mdb-col>
</mdb-row>
</mdb-container>
</div>
</template>

<script>
  import moment from "moment";

  export default {
    name: "profile-edit-id",
    layout: "default",

    data() {
      return {
        berita__list_style: this.$device.isDesktop
        ? "margin-top: 8rem;"
        : "margin-top: 6rem;",
        id: this.$route.params.id,
        path: this.$route.name,
        profiles: {
          nama: "",
          no_anggota: "",
          email: "",
          propinsi_id: "",
          kabupaten_id: "",
          photo: "",
          jenis_kelamin_id: "",
          status_pekerjaan_id: "",
          golongan_pekerjaan_id: "",
          agama_id: "",
          jenisKelamins: [],
          statusPernikahans: [],
          statusPekerjaans: [],
          golongan: [],
          religions: []
        },

        propinsi: [],
        kabupaten: [],
        filtered_kabupaten: [],
        input_file: File
      };
    },


    mounted() {
      this.ConfigApiUrl();
      this.IsLoggedIn();
      this.UserProfileData();
      this.PropinsiList();
      this.KabupatenList()
    },

    methods: {
      IsLoggedIn() {
        if (!this.token.accessToken) {
          this.$swal({
            icon: "error",
            title: "Oops...",
            text: "Anda tidak mempunyai hak akses ke halaman ini!",
          });
          setTimeout(() => {
            this.$router.push({
              name: "auth-login",
            });
          }, 900);
        }
      },

      CheckToken() {
        this.$store.dispatch("config/checkAuthLogin", "token");
      },

      ConfigApiUrl() {
        const api_url = process.env.NUXT_ENV_API_URL;
        this.$store.dispatch("config/storeConfigApiUrl", api_url);
      },

      simpan: async function () {
        console.log(this.profiles.jenis_kelamin_id)
        try {
          this.$swal({
            title: 'Do you want to save the changes?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            if (result.isConfirmed) {
             if (!this.profiles.tanggal_lahir) {
              alert("Tanggal lahir harus diisi");
              return;
            }

            if (this.token) {
              const url = `${this.api_url}/web/user`;
              this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;

              const formData = new FormData();
              formData.append("no_anggota", this.profiles.no_anggota);
              formData.append("email", this.profiles.email);
              formData.append("nama", this.profiles.nama);
              formData.append("tempat_lahir", this.profiles.tempat_lahir);
              formData.append("no_ktp", this.profiles.no_ktp);
              formData.append(
                "tanggal_lahir",
                moment(this.profiles.tanggal_lahir).format("YYYY-MM-DD")
                );
              formData.append("str", this.profiles.str);
              formData.append(
                "masa_berlaku",
                this.profiles.masa_berlaku
                ? moment(this.profiles.masa_berlaku).format("YYYY-MM-DD")
                : null
                );
              formData.append("propinsi_id", this.profiles.propinsi_id);
              formData.append("kabupaten_id", this.profiles.kabupaten_id);
              formData.append("address", this.profiles.address);
              formData.append("jenis_kelamin_id", this.profiles.jenis_kelamin_id);
              formData.append("status_pekerjaan_id", this.profiles.status_pekerjaan_id)
              formData.append("golongan_pekerjaan_id", this.profiles.golongan_pekerjaan_id)
              formData.append("agama_id", this.profiles.agama_id)

              if (this.input_file) formData.append("photo", this.input_file);

              this.$axios
              .post(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(({ data }) => {
                console.log(data);
                this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500
                })
                setTimeout(() => {
                  this.$router.go(-1)
                }, 1500)
              })
              .catch((err) => {
                console.log(err);
                alert("Gagal menyimpan profile. Coba lagi");
              })
              .finally(() => {
                this.loading = false;
              });
            }
          } 
        })

        } catch (e) {
          console.error("error:", e);
        }
      },

      listingProfiles(user){
        this.profiles.no_anggota = user.no_anggota;
        this.profiles.nama = user.nama;
        this.profiles.email = user.email;
        this.profiles.phone = user.phone
        this.profiles.tempat_lahir = user.tempat_lahir;
        this.profiles.no_ktp = user.no_ktp;
        if (user.tanggal_lahir) {
          this.profiles.tanggal_lahir = moment(user.tanggal_lahir).format(
            "YYYY-MM-DD"
            );
        }
        this.profiles.str = user.str;
        if (user.masa_berlaku) {
          this.profiles.masa_berlaku = moment(user.masa_berlaku).format(
            "YYYY-MM-DD"
            );
        }
        this.profiles.address = user.address;
        this.profiles.propinsi_id = user.propinsi_id;
        this.profiles.kabupaten_id = user.kabupaten_id;
        this.profiles.photo = user.photo;
      },

      listingGolongan(user){
        if(this.token){
          const url = `${this.api_url}/web/golongan-pegawai/list`
          this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
          this.$axios
          .get(url)
          .then(({data}) => {
            this.profiles.golongan = data.list_data
            const golongan_pekerjaan = data.list_data.map(d => d)
            const find_golongan_pekerjaan = golongan_pekerjaan.find(d => d.code == user.golongan_pekerjaan_id)

            this.profiles.golongan_pekerjaan_id = parseInt(find_golongan_pekerjaan.id)
          })
          .catch((err) => console.log(err.response ? err.response : err));
        }
      },

      listingGender(genders, user){
        const gender = genders.map(d => d)
        const jenis_kelamin = gender.find(d => d.code == user.jenis_kelamin_id)
        this.profiles.jenisKelamins = genders
        this.profiles.jenis_kelamin_id = parseInt(jenis_kelamin.code)
      },

      listingAgama(user){
        if(this.token){
          const url = `${this.api_url}/web/user-agama/list`
          this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
          this.$axios
          .get(url)
          .then(({data}) => {
            this.profiles.religions = data.list_data

            const list_agama = data.list_data.map(d => d)
            const find_agama = list_agama.find(d => d.code == user.agama_id)
            this.profiles.agama_id = parseInt(find_agama.code)
          })
          .catch((err) => console.log(err.response ? err.response : err))
        }
      },

      listingPekerjaan(works, user){
        this.profiles.statusPekerjaans = works
        const work = works.map(d => d)
        const status_pekerjaan = work.find(d => d.code == user.status_pekerjaan_id)
        this.profiles.status_pekerjaan_id = parseInt(status_pekerjaan.id)
      },


      UserProfileData() {
        if (this.token) {
          const url = `${this.api_url}/web/user`;
          this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
          this.$axios
          .get(url)
          .then(({ data }) => {

            this.listingProfiles(data.user)
            
            this.listingGender(data.jenisKelamins, data.user)

            this.listingPekerjaan(data.statusPekerjaans, data.user)

            this.listingAgama(data.user)

            this.listingGolongan(data.user)
            
          })
          .catch((err) => console.log(err.response ? err.response : err));
        }
      },

      PropinsiList() {
        const url = `${this.api_url}/web/propinsi`;
        this.$axios
        .get(url)
        .then(({ data }) => {
          this.propinsi = data.result;
        })
        .catch((err) => console.log(err.response ? err.response : err));
      },

      KabupatenList() {
        const url = `${this.api_url}/web/kabupaten`;
        this.$axios
        .get(url)
        .then(({ data }) => {
          this.kabupaten = data.result;
        })
        .catch((err) => console.log(err.response ? err.response : err));
      },

      changePropinsi(event) {
        this.profiles.kabupaten_id = parseInt(event.target.value)
      },

      changeGender(event){
        this.profiles.jenis_kelamin_id = parseInt(event.target.value)
      },


      previewFiles(event) {
        console.log(event.target.files[0]);
        const file = event.target.files[0];
        this.profiles.photo = URL.createObjectURL(file);
        console.log(this.profiles.photo);
        this.input_file = file;
      },
    },

    computed: {
      currentRouteName() {
        return this.$route.name;
      },
      token() {
        return this.$store.getters["config/ConfigCheckLogin"];
      },
      api_url() {
        return this.$store.getters["config/ConfigApiUrl"];
      },

      filteredGender(){
        if(this.profiles.jenis_kelamin_id == "" || this.profiles.jenis_kelamin_id == null)
          return this.jenisKelamins

        return this.profiles.jenisKelamins.filter(d => d.id == this.profiles.jenis_kelamin_id)
      },

      filteredPropinsi() {
        if (this.profiles.propinsi_id == "" || this.profiles.propinsi_id == null)
          return this.kabupaten;

        return this.kabupaten.filter(
          (c) => c.propinsi_id == this.profiles.propinsi_id
          );
      },
    },
  };
</script>
