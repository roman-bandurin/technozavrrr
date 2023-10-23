<template>
  <main class="content container">
    <div class="content__top content__top--not-found">
      <h1 class="content__title content__title--not-found">404</h1>
      <div class="content__title">Страница не найдена</div>
      <div>
        <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
          На главную
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "NotFoundPage",
}
</script>

<style>
.content__top--not-found {
  text-align: center;
}

.content__title--not-found {
  font-size: 1000%;
  line-height: 1.15;
  color: #9eff00;
}
</style>
