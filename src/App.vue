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
      event: [],
      eventObj: {},
      // save, ゲーム進行フラグ

    }
  },
  created () {
    // world1
    this.setMap('village1')
    window.addEventListener('keyup', this.keyup)
  },
  watch: {
    objLayer (val) {
      console.log('watch change objLayer')
    }
  },
  methods: {
    setMap (mapName) {
      const baseLayer = MapCollection[mapName].baseLayer.slice(0)
      const objLayer  = MapCollection[mapName].objLayer.slice(0)
      const event     = MapCollection[mapName].event.slice(0)
      const eventObj  = Object.assign({}, MapCollection[mapName].eventObj)

      const saveDataEventObj = SaveData.app[mapName].eventObj

      for (var elm in eventObj) {
        if (eventObj.hasOwnProperty(elm)) {
          if (eventObj[elm].type === 'takara') {
            // render、SaveDataの状態に応じてobjLayerを書き換える
            const x = eventObj[elm].x
            const y = eventObj[elm].y
            const status = saveDataEventObj[elm]
            objLayer[y][x] = status ? '27-08' : '27-07'
            eventObj[elm].value = status
          }
        }
      }

      this.mapName = mapName
      this.baseLayer = baseLayer
      this.objLayer = objLayer
      this.event = event
      this.eventObj = eventObj
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
        case 67:
          // C 調べる
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
        // console.log('eventType', eventType)
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
      console.log('investigate 調べる')
      let x = this.characterX
      let y = this.characterY
      const mapName = this.mapName
      const targetEventNum = this.event[y][x]
      // イベントが存在するか
      if (this.eventObj[targetEventNum] && this.eventObj[targetEventNum].type === 'takara') {
        console.log('たからだよ', this.eventObj[targetEventNum].value)
        const result = this.eventObj[targetEventNum].value
        if (result) {
          // すでにおっている
          console.log('もってるよ')
        } else {
          console.log('もってないよ')
          // 保存
          SaveData.app[mapName].eventObj[targetEventNum] = true
          this.eventObj[targetEventNum].value = true
          const objLayer = this.objLayer.slice(0)
          objLayer[y][x] = '27-08'
          this.objLayer = objLayer
        }
      }

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
