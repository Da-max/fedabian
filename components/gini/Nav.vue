<template>
  <nav>
    <ul class="uk-nav uk-nav-default">
      <li>
        <nuxt-link to="/donnees/gini/definition"
          >Qu’est ce que le coefficient de Gini ?</nuxt-link
        >
        <nuxt-link to="/donnees/gini/monde"
          >Le coefficient de Gini dans le monde</nuxt-link
        >
      </li>
      <li class="uk-nav-divider"></li>
      <li><nuxt-link to="/donnees/gini/a-propos">A propos</nuxt-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'GiniNav'
}
</script>
