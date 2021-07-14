<template>
  <div class="app-container">
    <form-page :page-type="1" />
  </div>
</template>

<script>
import FormPage from './common/FormPage'

export default {
  name: 'Edit',
  components: {
    FormPage
  }
}
</script>
