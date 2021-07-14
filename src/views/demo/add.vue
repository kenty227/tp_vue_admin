<template>
  <div class="app-container">
    <form-page :page-type="0" />
  </div>
</template>

<script>
import FormPage from './common/FormPage'

export default {
  name: 'Add',
  components: {
    FormPage
  }
}
</script>
