<template>
  <div v-if="loading || failed" class="loading__backdrop">
    <div class="loading__content">
      <div v-if="loading" class="loading__preloader"></div>
      <div v-if="failed" class="filter">
        <p class="filter__title">Произошла ошибка при загрузке товаров</p>
        <button
          type="button"
          class="filter__submit button button--primery"
          @click.prevent="retry"
        >
          Попробовать еще раз
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseLoading",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    failed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    retry() {
      this.$emit("retry")
    },
  },
}
</script>

<style scoped>
.loading__backdrop {
  position: absolute;
  left: -2%;
  width: 104%;
  height: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 2;
}

.loading__preloader {
  animation: spin 1s linear infinite;
  height: 10px;
  width: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -5px;
}

@keyframes spin {
  0% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #000,
      30px -10px #000, 30px 0px #000, 30px 10px #000, 20px 20px #9eff00,
      10px 30px #9eff00, 0px 30px transparent, -10px 30px transparent,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  6.25% {
    box-shadow: 0px -30px transparent, 10px -30px #000, 20px -20px #000,
      30px -10px #000, 30px 0px #000, 30px 10px #000, 20px 20px #000,
      10px 30px #9eff00, 0px 30px #9eff00, -10px 30px transparent,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  12.5% {
    box-shadow: 0px -30px transparent, 10px -30px transparent, 20px -20px #000,
      30px -10px #000, 30px 0px #000, 30px 10px #000, 20px 20px #000,
      10px 30px #000, 0px 30px #9eff00, -10px 30px #9eff00,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  18.75% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px #000, 30px 0px #000, 30px 10px #000,
      20px 20px #000, 10px 30px #000, 0px 30px #000, -10px 30px #9eff00,
      -20px 20px #9eff00, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  25% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px #000,
      30px 10px #000, 20px 20px #000, 10px 30px #000, 0px 30px #000,
      -10px 30px #000, -20px 20px #9eff00, -30px 10px #9eff00,
      -30px 0px transparent, -30px -10px transparent, -20px -20px transparent,
      -10px -30px transparent;
  }
  31.25% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px transparent,
      30px 10px #000, 20px 20px #000, 10px 30px #000, 0px 30px #000,
      -10px 30px #000, -20px 20px #000, -30px 10px #9eff00, -30px 0px #9eff00,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  37.5% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px transparent,
      30px 10px transparent, 20px 20px #000, 10px 30px #000, 0px 30px #000,
      -10px 30px #000, -20px 20px #000, -30px 10px #000, -30px 0px #9eff00,
      -30px -10px #9eff00, -20px -20px transparent, -10px -30px transparent;
  }
  43.75% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px transparent,
      30px 10px transparent, 20px 20px transparent, 10px 30px #000,
      0px 30px #000, -10px 30px #000, -20px 20px #000, -30px 10px #000,
      -30px 0px #000, -30px -10px #9eff00, -20px -20px #9eff00,
      -10px -30px transparent;
  }
  50% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px transparent,
      30px 10px transparent, 20px 20px transparent, 10px 30px transparent,
      0px 30px #000, -10px 30px #000, -20px 20px #000, -30px 10px #000,
      -30px 0px #000, -30px -10px #000, -20px -20px #9eff00, -10px -30px #9eff00;
  }
  56.25% {
    box-shadow: 0px -30px #9eff00, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px transparent,
      30px 10px transparent, 20px 20px transparent, 10px 30px transparent,
      0px 30px transparent, -10px 30px #000, -20px 20px #000, -30px 10px #000,
      -30px 0px #000, -30px -10px #000, -20px -20px #000, -10px -30px #9eff00;
  }
  62.5% {
    box-shadow: 0px -30px #9eff00, 10px -30px #9eff00, 20px -20px transparent,
      30px -10px transparent, 30px 0px transparent, 30px 10px transparent,
      20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px #000, -30px 10px #000, -30px 0px #000,
      -30px -10px #000, -20px -20px #000, -10px -30px #000;
  }
  68.75% {
    box-shadow: 0px -30px #000, 10px -30px #9eff00, 20px -20px #9eff00,
      30px -10px transparent, 30px 0px transparent, 30px 10px transparent,
      20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px #000,
      -30px 0px #000, -30px -10px #000, -20px -20px #000, -10px -30px #000;
  }
  75% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #9eff00,
      30px -10px #9eff00, 30px 0px transparent, 30px 10px transparent,
      20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px transparent,
      -30px 0px #000, -30px -10px #000, -20px -20px #000, -10px -30px #000;
  }
  81.25% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #000,
      30px -10px #9eff00, 30px 0px #9eff00, 30px 10px transparent,
      20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px transparent,
      -30px 0px transparent, -30px -10px #000, -20px -20px #000,
      -10px -30px #000;
  }
  87.5% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #000,
      30px -10px #000, 30px 0px #9eff00, 30px 10px #9eff00,
      20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px transparent,
      -30px 0px transparent, -30px -10px transparent, -20px -20px #000,
      -10px -30px #000;
  }
  93.75% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #000,
      30px -10px #000, 30px 0px #000, 30px 10px #9eff00, 20px 20px #9eff00,
      10px 30px transparent, 0px 30px transparent, -10px 30px transparent,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px #000;
  }
  100% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #000,
      30px -10px #000, 30px 0px #000, 30px 10px #000, 20px 20px #9eff00,
      10px 30px #9eff00, 0px 30px transparent, -10px 30px transparent,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
}

.filter__submit.button.button--primery {
  margin: 15px;
  width: stretch;
}
</style>
