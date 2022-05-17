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
    <!-- Navbar brand -->
    <mdb-navbar-brand>
      <nuxt-link to="/">
        <!-- <MoleculesLayoutMoleculesBrand /> -->
        <img :src="require('~/assets/images/logo/brand.svg')" class="img-fluid">
      </nuxt-link>
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav left>
        <mdb-nav-item active waves-fixed >
          <nuxt-link to="/" tag="li" navLink > Home </nuxt-link>
        </mdb-nav-item>
        <mdb-nav-item waves-fixed>
          <nuxt-link to="/events" tag="li" navLink > Katalog Kelas </nuxt-link>
        </mdb-nav-item>
        <mdb-nav-item v-if="!token.accessToken" waves-fixed>
          <nuxt-link to="/agendapelatihan" tag="li" navLink > Agenda Pelatihan </nuxt-link>
        </mdb-nav-item>

        <mdb-nav-item v-if="token.accessToken" waves-fixed>
          <nuxt-link tag="li" navLink  :to="`/profile/${$username(slug)}/events`">Akses Pelatihan</nuxt-link>
        </mdb-nav-item>
        <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle
          tag="a"
          navLink
          color="white"
          slot="toggle"
          waves-fixed
          class="no-caret"
          >
          Tentang PPKC <mdb-icon icon="external-link-alt" size="md" />
        </mdb-dropdown-toggle>
        <mdb-dropdown-menu :class="`${$device.isDesktop ? 'mt-3' : ''}`">
          <mdb-dropdown-item v-for="item in links" :key="item.id">
            <nuxt-link :to="item.link">
              {{ item.name }}
            </nuxt-link>
          </mdb-dropdown-item>
        </mdb-dropdown-menu>
      </mdb-dropdown>
      <mdb-nav-item waves-fixed>
        <nuxt-link to="/ppkc/berita" tag="li" navLink > Berita </nuxt-link>
      </mdb-nav-item>
    </mdb-navbar-nav>
  </mdb-container>
</mdb-dropdown-menu>
</mdb-dropdown>

<mdb-dropdown
v-if="token.accessToken"
tag="li"
class="nav-item nav-profile"
style="font-size: 31px !important"
>
<mdb-dropdown-toggle tag="a" navLink slot="toggle">
  {{profiles.nama}}
  <b-avatar v-if="profiles.photo !== 'https://api.ppkc-online.com/image-profiles/null'" variant="primary" :src="profiles.photo"></b-avatar>
  <b-avatar v-else variant="primary" :text="slug.charAt(0)"></b-avatar>
  
</mdb-dropdown-toggle>
<mdb-dropdown-menu :class="`${$device.isDesktop ? 'mt-2' : 'mt-3'}`">
  <mdb-dropdown-item>
    <nuxt-link
    :to="{
      name: 'profile-name',
      params: { name: $username(slug) },
    }"
    class="text-center"
    >
    <b-avatar v-if="profiles.photo !== 'https://api.ppkc-online.com/image-profiles/null'" variant="primary" :src="profiles.photo" size="1.7rem"></b-avatar>
  <b-avatar v-else variant="primary" :text="slug.charAt(0)" size="1.7rem"></b-avatar> &nbsp; <b>{{ profiles.nama }}</b>
  </nuxt-link>
</mdb-dropdown-item>
<div class="dropdown-divider"></div>
<mdb-dropdown-item @click="Logout" class="text-center">
  <mdb-icon icon="sign-out-alt" /> Logout
</mdb-dropdown-item>
</mdb-dropdown-menu>
</mdb-dropdown>
<div v-else>
  <!-- <nuxt-link
  to="/auth/registrasi"
  class="my__btn-circle ml-2 btn shadow-none"
  size="md"
  ><mdb-icon icon="shopping-cart" size="md" /></nuxt-link> -->

  <nuxt-link 
  to="/auth/login"
  class="my__btn-secondary ml-2 rounded-pill btn btn-md shadow-none"
  size="md"
  >Masuk</nuxt-link>

  <nuxt-link
  to="/auth/registrasi"
  class="my__btn-primary rounded-pill btn btn-md shadow-none"
  size="md"
  >Daftar</nuxt-link>
</div>
<!-- end check -->
</mdb-navbar-toggler>
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
        { id: 5, name: "Testimoni", link: "/ppkc/testimoni" },
        { id: 6, name: "Fasilitator", link: "/ppkc/fasilitator" },
        { id: 7, name: "Yayasan & Direksi", link: "/ppkc/yayasan-direksi" },
      ],
    };
  },

  mounted() {
    console.log(this.event_id ? this.event_id : "-");
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

    GoToRegistrasi() {
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


