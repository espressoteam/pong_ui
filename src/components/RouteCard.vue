<template>
  <div class="mdl-card mdl-shadow--4dp" :style="{backgroundImage: 'url(' + route.imageUrl + ')'}" @click="click">
    <div class="mdl-card__title mdl-card--expand">
      <span class="media-text right">{{route.title}} by {{route.traveller}}</span>
    </div>
    <div class="mdl-card__actions top">
      <span class="media-text">
        {{ route.info }}
      </span>
      <br/>
    </div>
    <div class="mdl-card__actions bottom">
      <span class="media-text small">
        {{ route.duration }}, {{ route.copied }} people copied
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'route-card',
  props: ['route'],
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
<style scoped>
.mdl-card {
  background-position: center;
  background-size: cover;
  cursor: pointer;
}

.mdl-card__actions {
  background: rgba(0, 0, 0, 0.5);
}

.mdl-card__actions.top {
  height: 42px;
}

.mdl-card__actions.bottom {
  height: 30px;
}

.mdl-card__title>span {
  position: absolute;
  top: 5px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.5);
}

.mdl-card__title>span.left {
  left: 5px;
  font-size: 16px;
  font-weight: 500;
}

.mdl-card__title>span.right {
  right: 5px;
  font-size: 12px;
  font-weight: 500;
}

.media-text {
  color: #fff;
}

.media-text.small {
  font-size: small;
  font-style: italic;
}
</style>
