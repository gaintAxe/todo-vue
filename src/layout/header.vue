<template>
  <div>
    <header :class = "a.mainheader">
      <h1>JTodo</h1>
    </header>
    <!-- <header :class="$style.mainheader">
    <h1 :class="$style.h1z">JTodo</h1>
    </header>-->
    <div :class="b.mainheader2"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log('a', this.a, 'b', this.b.mainheader2)
  }
}
</script>
<style lang="less" scoped >
// @color: red;
// .main-header {
//   background: @color;
// }
</style>
<style  module="b">
.mainheader2 {
  text-align: center;
  background: blue;
  height:100px;
  width:100%;
}
</style>
<style  lang="scss" module="a">
.mainheader {
  text-align: center;
//   background: $color;
  h1 {
    font-size: 100px;
    color: rgba(175, 47, 47, 0.4);
    font-weight: 100;
    margin: 20px;
  }
}
</style>
<style lang="stylus">

// .main-header {

//   text-align: center;

//   h1{

//     font-size: 100px;

//     color: rgba(175, 47, 47, 0.4);

//     font-weight: 100;

//     margin: 20px;

//   }

// }

</style>

<docs>
#123 =456
</docs>
