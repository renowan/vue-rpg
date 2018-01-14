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
import SaveData from './SaveData.js'
import ItemCollection from './ItemCollection.js'

export default {
  name: 'app',
  components: {
    Yagai,
    Character
  },
  data () {
    return {
      // app
      mapName: '',
      characterX: 7,
      characterY: 6,
      constant,
      charDir: 0,
      baseLayer: [],
      objLayer: [],

      // save, ゲーム進行フラグ

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

      // 保存データのフラグ処理
      const eventData = SaveData.app[mapName].eventObj
      eventData.forEach((elm, index) => {
        const targetMasuEvnt = MapCollection[mapName].eventObj[elm]
        console.log('targetMasuEvnt', targetMasuEvnt)
        targetMasuEvnt.valid = false
        const _x = targetMasuEvnt.takara.x
        const _y = targetMasuEvnt.takara.y

        // this.objLayer[_x][_y] = ItemCollection[elm].inValidImg
        // MapCollection[mapName].objLayer
      })


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
        case 67:
          this.investigate()
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
      const validMasu = '*11-01*14-07*14-10*'

      if (validMasu.indexOf(nextBase) > -1) return false
      return true
    },
    checkNextMasuAction () {
      let x = this.characterX
      let y = this.characterY

      const mapName = this.mapName

      if (MapCollection[mapName].event[y][x]) {
        // const eventNum = `obj${MapCollection[mapName].event[y][x]}`
        const eventNum = MapCollection[mapName].event[y][x]
        const eventObj = MapCollection[mapName].eventObj[eventNum]
        const eventType = eventObj.type

        switch (eventType) {
          case 'link':
            this.goLink(eventObj)
            break;
        }
      }
    },
    goLink (eventObj) {
      this.setMap(eventObj.mapName)
      this.characterX = eventObj.x
      this.characterY = eventObj.y
    },
    investigate () {
      let x = this.characterX
      let y = this.characterY

      const charDir = this.charDir

      switch (charDir) {
        case 0:
          y ++
          break;
        case 1:
          x --
          break;
        case 2:
          y --
          break;
        case 3:
          x ++
          break;
      }
      // if (!this.event[y] || this.event[y][x]) return
      // this.event[y][x]
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
  background-color: #000;
  position: relative;
  overflow: hidden;
}

.field {
  width: 99999px;
  height: 99999px;
  position: absolute;
}
</style>
