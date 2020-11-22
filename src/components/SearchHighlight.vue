<template>
  <div class="search-highlight" v-html="contentShow">
  </div>
</template>

<script>
const PLUGIN_FLAG = 'search-hightlight_by_mumaa'

export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    keyword: {
      type: String,
      default: ''
    },
    highlightStyle: {
      type: String,
      default: 'background: #ffff00'
    },
    currentStyle: {
      type: String,
      default: 'background: #ff9632'
    }
  },
  data () {
    return {
      lightIndex: 0,
      matchCount: 0,
      contentShow: '',
      random: Math.random()
    }
  },
  computed: {
    watchString () {
      return [this.content, this.keyword]
    },
    watchStyle () {
      return [this.lightIndex, this.highlightStyle, this.currentStyle]
    },
    styleSelector () {
      return `style[${PLUGIN_FLAG}='${this.random}']`
    }
  },
  watch: {
    watchString: {
      immediate: true,
      handler () {
        this.refresh()
      }
    },
    watchStyle: {
      immediate: true,
      handler () {
        this.setStyle()
      }
    },
    lightIndex: {
      immediate: true,
      handler () {
        this.$emit('current-change', this.lightIndex)
      }
    },
    matchCount: {
      immediate: true,
      handler () {
        this.$emit('match-count-change', this.matchCount)
      }
    }
  },
  beforeDestroy () {
    this.clearStyle()
  },
  methods: {
    refresh () {
      if (!this.keyword) {
        this.contentShow = this.content
        return
      }
      const div = document.createElement('div')
      div.innerHTML = this.content
      const textNodes = []
      const nodeList = [...div.childNodes]
      while (nodeList.length) {
        let node = nodeList.shift()
        if (node.nodeType == node.TEXT_NODE) {
          node.wholeText && textNodes.push(node)
        } else {
          nodeList.unshift(...node.childNodes)
        }
      }
      let length = 0
      const textList = textNodes.map(text => {
        let start = length, end = length + text.wholeText.length
        length = end
        return [text.wholeText, start, end]
      })
      const content = textList.map(([text]) => text).join('')
      const characters = [...'\\[]()?.+*^${}:'].reduce((r, c) => (r[c] = true, r), {})
      const keyword = this.keyword.split('').map(s => characters[s] ? `\\${s}` : s).join('[\\s\\n]*')
      const reg = new RegExp(keyword, 'gmi')
      const matchList = [...content.matchAll(reg)]
      this.matchCount = matchList.length
      this.lightIndex = this.matchCount ? 1 : 0
      for (let i = matchList.length - 1; i >= 0; i--) {
        let match = matchList[i]
        let matchStart = match.index, matchEnd = matchStart + match[0].length
        let startIndex = textList.findIndex(x => x[1] <= matchStart && x[2] >= matchStart)
        let endIndex = textList.findIndex(x => x[1] <= matchEnd && x[2] >= matchEnd)
        for (let idx = startIndex; idx <= endIndex; idx++) {
          let textNode = textNodes[idx]
          let [text, nodeStart, nodeEnd] = textList[idx]
          let start = Math.max(0, matchStart - nodeStart)
          let len = Math.min(nodeEnd, matchEnd) - nodeStart - start
          if (start > 0) textNode = textNode.splitText(start)
          if (len < textNode.wholeText.length) textNode.splitText(len)
          let font = document.createElement('font')
          font.setAttribute(PLUGIN_FLAG, i + 1)
          font.innerText = text.substr(start, len)
          textNode.parentNode.replaceChild(font, textNode)
        }
      }
      this.contentShow = div.innerHTML
    },
    scrollTo (index) {
      this.$nextTick(() => {
        let node = this.$el.querySelector(`font[${PLUGIN_FLAG}='${index}']`)
        if (node) {
          this.lightIndex = index
          node.scrollIntoView()
        }
      })
    },
    searchNext () {
      this.$nextTick(() => {
        let idx = this.lightIndex >= this.matchCount ? 1 : this.lightIndex + 1
        this.scrollTo(idx)
      })
    },
    searchLast () {
      this.$nextTick(() => {
        let idx = this.lightIndex <= 1 ? this.matchCount : this.lightIndex - 1
        this.scrollTo(idx)
      })
    },
    setStyle () {
      let style = document.head.querySelector(this.styleSelector)
      if (!style) {
        style = document.createElement('style')
        style.setAttribute(PLUGIN_FLAG, this.random)
      }
      style.innerText = `font[${PLUGIN_FLAG}]{${this.highlightStyle}}font[${PLUGIN_FLAG}='${this.lightIndex}']{${this.currentStyle}}`
      document.head.appendChild(style)
    },
    clearStyle () {
      let style = document.head.querySelector(this.styleSelector)
      style && document.head.removeChild(style)
    }
  }
}
</script>
