<template>
  <div>
    <mdb-navbar
      class="fixed-top"
      light
      color="white"
      expand="large"
      togglerIcon=""
      animated
      animation="3"
    >
      <mdb-container>
        <!-- Navbar brand -->
        <mdb-navbar-brand>
          <nuxt-link to="/">
            <MoleculesLayoutMoleculesBrand />
          </nuxt-link>
        </mdb-navbar-brand>
        <mdb-navbar-toggler>
          <mdb-navbar-nav right>
            <mdb-nav-item active waves-fixed>
              <nuxt-link to="/"> Home </nuxt-link>
            </mdb-nav-item>
            <mdb-nav-item waves-fixed>
              <nuxt-link to="/events"> Events </nuxt-link>
            </mdb-nav-item>
            <mdb-nav-item v-if="token.accessToken" waves-fixed>
              <nuxt-link :to="`/profile/${$username(slug)}/events`">Akses Pelatihan</nuxt-link>
            </mdb-nav-item>
            <mdb-dropdown tag="li" class="nav-item">
              <mdb-dropdown-toggle
                tag="a"
                navLink
                color="white"
                slot="toggle"
                waves-fixed
              >
                Tentang PPKC
              </mdb-dropdown-toggle>
              <mdb-dropdown-menu :class="`${$device.isDesktop ? 'mt-3' : ''}`">
                <mdb-dropdown-item v-for="item in links" :key="item.id">
                  <nuxt-link :to="item.link">
                    {{ item.name }}
                  </nuxt-link>
                </mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown>
          </mdb-navbar-nav>
          <!-- <mdb-btn v-if="$device.isMobile" size="md" @click="$router.push({name: 'auth-login'})" block class="my__btn-primary mt-5 rounded">Masuk</mdb-btn> -->
          <!-- check user login -->
          <mdb-dropdown
            v-if="token.accessToken"
            tag="li"
            class="nav-item nav-profile"
            style="font-size: 31px !important"
          >
            <mdb-dropdown-toggle tag="a" navLink slot="toggle">
              <!-- <mdb-icon far icon="user-circle" size="lg"/>  -->
              <!-- <b-img v-if="profiles.photo !==
                  'https://api.ppkc-online.com/image-profiles/null'" :src="profiles.photo" rounded="circle" alt="Circle image" width="30"></b-img>
              <b-img v-else :src="`${require('~/assets/images/profile/profile.svg')}`" rounded="circle" alt="Circle image" width="30" height="30"></b-img> -->
              <b-avatar v-if="profiles.photo !== 'https://api.ppkc-online.com/image-profiles/null'" variant="info" :src="profiles.photo"></b-avatar>
              <b-avatar v-else variant="primary" :text="slug.charAt(0)"></b-avatar>
              {{profiles.nama}}
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu :class="`${$device.isDesktop ? 'mt-2' : ''}`">
              <mdb-dropdown-item>
                <nuxt-link
                  :to="{
                    name: 'profile-name',
                    params: { name: $username(slug) },
                  }"
                  class="text-center"
                >
                  <mdb-icon icon="user-md" /> {{ profiles.nama }}
                </nuxt-link>
                <!-- <a :href="`/profile/${$username(slug)}`" class="text-center">
                  <mdb-icon icon="user-md" /> Profile
                </a> -->
              </mdb-dropdown-item>
              <div class="dropdown-divider"></div>
              <mdb-dropdown-item @click="Logout" class="text-center">
                <mdb-icon icon="sign-out-alt" /> Logout
              </mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <div v-else>
            <a v-if="path == '/auth/login'"
            href="/auth/registrasi"
            class="my__btn-primary ml-4 rounded btn btn-primary"
            size="md"
            >Daftar</a
            >
            <a v-else
            href="/auth/login"
            class="my__btn-primary ml-4 rounded btn btn-primary"
            size="md"
            >Masuk</a
            >
          </div>
          <!-- end check -->
        </mdb-navbar-toggler>
      </mdb-container>
    </mdb-navbar>
  </div>
</template>



<script>
export default {
  props: ["token", "profiles", "slug", "event_id", "event_path"],
  data() {
    return {
      links: [
        { id: 1, name: "Sejarah", link: "/ppkc/sejarah" },
        { id: 2, name: "Visi & Misi", link: "/ppkc/visi-misi" },
        {
          id: 3,
          name: "Struktur Organisasi",
          link: "/ppkc/struktur-organisasi",
        },
        { id: 4, name: "Fasilitas", link: "/ppkc/fasilitas" },
        { id: 5, name: "Berita", link: "/ppkc/berita" },
        { id: 6, name: "Testimoni", link: "/ppkc/testimoni" },
        { id: 7, name: "Fasilitator", link: "/ppkc/fasilitator" },
        { id: 8, name: "Yayasan & Direksi", link: "/ppkc/yayasan-direksi" },
      ],
      path: this.$route.path,
      mainProps: { blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1' }
    };
  },


  methods: {
    Logout() {
      this.$emit("logout-profile");
    },

    GoToLogin() {
      if (this.event_id === this.$route.params.id) {
        const data = {
          event_id: this.event_id,
          event_path: this.event_path,
        };
        this.SetEventLogin(data);
      } else {
        this.$router.push({ name: "auth-login" });
      }
    },

    GoToRegistrasi(){
      this.$router.push({ name: "auth-registrasi" });
    },

    SetEventLogin(data) {
      this.$store.dispatch("config/setEventToLogin", JSON.stringify(data));
      this.$router.push({
        name: "auth-login",
      });
    },
  },

  computed: {
    set_event() {
      return this.$store.getters["config/ConfigSetEventLogin"];
    },
  },
};
</script>


