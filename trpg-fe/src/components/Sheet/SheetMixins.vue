<script>
import debounce from "lodash.debounce";
import api from "@/api";

export default {
  name: "SheetMixins",
  data(){
    return{
      session:{}
    }
  },
  mounted() {
    this.loadSheet()
    this.loadSession()
    this.$socket.emit('joinSheet', this.$route.params.id)
  },
  methods:{
    socketInput: debounce(function (data, key) {
      this.$socket.emit('clientInput', data, key, this.$route.params.id)
    }, 1000),
    $withoutWatchers(cb) {
      const watchers = this._watchers.map((watcher) => ({cb: watcher.cb, sync: watcher.sync}))
      for (let index in this._watchers) {
        this._watchers[index] = Object.assign(this._watchers[index], {cb: () => null, sync: true})
      }
      cb()
      for (let index in this._watchers) {
        this._watchers[index] = Object.assign(this._watchers[index], watchers[index])
      }
    },
    copyCode() {
      const code = document.getElementById('code')
      code.setAttribute('type', 'text')
      code.select()
      code.setSelectionRange(0, 99999)
      document.execCommand('copy')
      code.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    deleteSheet() {
      api.deleteSheet(this.$route.params.id)
          .then(res => {
            this.$store.dispatch('setSheet')
                .then(() => {
                  this.$socket.emit('clientDelete', this.$route.params.id)
                  alert(res)
                  this.$router.replace('/sheet')
                })
          })
          .catch(err => {
            alert(err)
          })
    },
    loadSession() {
      if (this.$route.query.session)
        api.getSessionInfo(this.$route.query.session)
            .then(session => {
              console.log(session)
              this.session=session
            })
    },
  },
  sockets: {
    syncInput(data) {
      this.$withoutWatchers(() => {
        this[data[1]] = data[0]
      })
    },
    deleteSheet() {
      this.$store.dispatch('setSheet')
      this.$router.replace('/sheet')
    },
    reconnect() {
      this.$data.success.not_init = false
      this.loadSheet()
    }
  },
  computed:{
    getSuccessColor() {
      if (this.success.upload) {
        return '#42b983'
      } else return '#28a1dc'
    },
  }
}
</script>

<style scoped lang="scss">
.tab {
  width: 90% !important;

  input {
    font-size: 15px;
  }
}
</style>
