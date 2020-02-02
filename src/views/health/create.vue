<template>
  <health-detail :is-edit="false" />
</template>

<script>
import HealthDetail from './components/Detail'

export default {
  name: 'HealthCreate',
  components: { HealthDetail }
}
</script>