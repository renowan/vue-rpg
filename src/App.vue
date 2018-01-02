<template>
  <div id="app">
    <div class="container mt32">
      <div class="col-xs-12">
        <div class="app-container">
          <Yagai :baseLayer="baseLayer" :objLayer="objLayer" :characterX="characterX" :characterY="characterY" :constant="constant"></Yagai>
          <Character :charDir="charDir" :characterX="characterX" :characterY="characterY" :constant="constant"></Character>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Yagai from '@/components/Yagai'
import Character from '@/components/Character'
import constant from './constant'
import MapCollection from './MapCollection.js'

export default {
  name: 'app',
  components: {
    Yagai,
    Character
  },
  data () {
    return {
      mapName: '',
      characterX: 7,
      characterY: 6,
      constant,
      charDir: 0,
      baseLayer: [],
      objLayer: []
    }
  },
  created () {
    // world1
    this.setMap('village1')
    window.addEventListener('keyup', this.keyup)
  },
  watch: {

  },
  methods: {
    setMap (mapName) {
      this.mapName = mapName
      this.baseLayer = MapCollection[mapName].baseLayer
      this.objLayer = MapCollection[mapName].objLayer
    },
    keyup (e) {
      const keyCode = e.keyCode
      // console.log(keyCode)
      switch (keyCode) {
        case 38:
          // ↑
          this.charDir = 2
          if (this.canMove('y', -1)) this.characterY --
          break
        case 40:
          // ↓
          this.charDir = 0
          if (this.canMove('y', 1)) this.characterY ++
          break
        case 37:
          // ←
          this.charDir = 1
          if (this.canMove('x', -1)) this.characterX --
          break
        case 39:
          // →
          this.charDir = 3
          if (this.canMove('x', 1)) this.characterX ++
          break
      }
      this.checkNextMasuAction()
    },
    // 次のマス行けるかのチェック
    canMove (dir, value) {
      let x = this.characterX
      let y = this.characterY
      if (dir === 'x') x += value
      if (dir === 'y') y += value
      if (!this.baseLayer[y]) return false
      const nextBase = this.baseLayer[y][x]
      if (!nextBase) return false

      // 背景で行けない場所
      const validMasu = '*11-01*'
      if (validMasu.indexOf(nextBase) > -1) return false 
      return true
    },
    checkNextMasuAction () {
      let x = this.characterX
      let y = this.characterY
      
      const mapName = this.mapName
      const location = `${String(x)}-${String(y)}`
      console.log(MapCollection[mapName].event)
      if (MapCollection[mapName].event.hasOwnProperty(location)) {
        console.log('location event', MapCollection[mapName].event[location])
      }
      
      // if (this.objLayer[y] && this.objLayer[y][x] && this.objLayer[y][x] !== '00-00') {
      //   const nextObj = this.objLayer[y][x]
      //   console.log('何かあるぞ', x, y, this.objLayer[y][x])
      //   // 外に出た
      //   if (nextObj === '00-01') {
      //     const outSideMapName = MapCollection[this.mapName].outSideMap
      //     this.setMap(outSideMapName)
      //   }
      // }
    }
  }
}
</script>

<style>

#app {
  /*margin-top: 60px;*/
}

.app-container {
  width: 480px;
  height: 416px;
  background-color: #999;
  position: relative;
  overflow: hidden;
}

.field {
  width: 99999px;
  height: 99999px;
  position: absolute;
}
</style>
