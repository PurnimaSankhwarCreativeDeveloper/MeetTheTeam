  <template>
    <div class="user-cards" ref="cardTemplate">
      <div class="user-card" v-for="user in displayedUsers" :key="user.id">
        <div class="header-dv" :style="{ backgroundColor: getRandomColor() }">
          <div class="header">{{ user.name.first }} {{ user.name.last }}</div>
          <img :src="user.picture.large" :alt="user.name.first" />
          <svg style="margin-top: 20%" viewBox="0 0 500 400">
            <path
              fill="white"
              d="M0,250
                                  L0,500
                                  L500,500
                                  L500,300
                                  Q350,200 200,250
                                  Q50,300 0,250
                                  Z"
            />
          </svg>
        </div>
        <div class="main-dv"></div>
        <p class="footer1">{{ user.location.city }}</p>
        <p class="footer2"><i class="fa-regular fa-envelope"></i></p>
      </div>
      <div ref="sentinel"></div>
    </div>
  </template>
  <script>
  export default {
    props: {
      displayedUsers: {
        type: Array,
        default: () => [],
      },
    },

    data() {
      return {
        colors: ["#e8cdad", "#a2b8a9", "#e0c0b2"],
        lastColorIndex: -1,
        observer: null,
        currentPage: 1,
      };
    },

    mounted() {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.$emit("childMounted", this.currentPage);
          this.currentPage += 1;
        }
      });
      this.observer.observe(this.$refs.sentinel);
    },

    methods: {
      getRandomColor() {
        let index;
        do {
          index = Math.floor(Math.random() * this.colors.length);
        } while (index === this.lastColorIndex);
        this.lastColorIndex = index;
        return this.colors[index];
      },
    },
  };
  </script>

<style scoped>
.footer1 {
  margin-top: -15px;
  font-size: 12px;
  font-weight: 200;
  font-family: system-ui;
}
.main-dv {
  background-color: #fff;
  height: 25px;
}
.header-dv {
  padding-top: 10px;
  margin-bottom: -20px;
  border-radius: 20px;
}
.header {
  margin-top: 10px;
  width: 100%;
  font-family: system-ui;
  font-weight: 500;
  position: absolute;
}

.user-cards {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  gap: 30px;
  grid-template-columns: 150px 150px;
  justify-content: center;
  margin-top: 16px;
}

.user-card {
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  text-align: center;
  position: relative;
}

.user-card img {
  z-index: 2;
  position: absolute;
  left: 25%;
  margin-top: 45%;
  width: 50%;
  border-radius: 50%;
}

@media (min-width: 600px) {
  .header {
    margin-top: 30px;
    font-size: initial;
  }
  .header-dv {
    padding-top: 20px;
  }
  .user-cards {
    gap: 60px;
    grid-template-columns: 180px 180px 180px;
  }
  .footer1 {
    margin-top: 5px;
  }
  .footer2 {
    padding: 5px;
  }
  .user-card img {
    margin-top: 45%;
  }
  .main-dv {
    background-color: #fff;
    height: 20px;
  }
}
</style>