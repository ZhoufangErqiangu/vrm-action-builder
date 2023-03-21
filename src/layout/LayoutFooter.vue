<template>
  <div class="foot-box">
    <div class="text1">
      <!-- this is a very beautiful foot. -->
    </div>
    <div class="text2">
      <a href="mailto:xxx@xxx.com">
        Power by Alex
      </a>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
        备案号: 沪ICP备XXXXXXXX号-1
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.foot-box {
  .text1 {
    height: 32px;
    text-align: center;
  }

  .text2 {
    padding: 2px 0;
    color: #aaaaaa;
    text-align: center;

    a {
      color: #aaa;
      text-decoration: none;

      &:visited {
        color: #aaa;
        text-decoration: none;
      }
    }
  }
}
</style>
