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
    },
    regExp: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lightIndex: 0,
      matchCount: 0,
      contentShow: '',
      random: `${Math.random()}`.slice(2)
    }
  },
  computed: {
    watchString () {
      return [this.content, this.keyword]
    },
    watchStyle () {
      return [this.lightIndex, this.highlightStyle, this.currentStyle]
    },
    flag () {
      return `${PLUGIN_FLAG}${this.random}`
    },
    styleSelector () {
      return `style[${this.flag}]`
    },
  },
  watch: {
    watchString: {
      immediate: true,
      handler () {
        this.replaceKeywords()
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
    getTextNodeList (dom) {
      const nodeList = [...dom.childNodes]
      const textNodes = []
      while (nodeList.length) {
        const node = nodeList.shift()
        if (node.nodeType === node.TEXT_NODE) {
          node.wholeText && textNodes.push(node)
        } else {
          nodeList.unshift(...node.childNodes)
        }
      }
      return textNodes
    },

    getTextInfoList (textNodes) {
      let length = 0
      const textList = textNodes.map(node => {
        let startIdx = length, endIdx = length + node.wholeText.length
        length = endIdx
        return {
          text: node.wholeText,
          startIdx,
          endIdx
        }
      })
      return textList
    },

    getMatchList (content, keyword) {
      if (!this.regExp) {
        const characters = [...'\\[](){}?.+*^$:|'].reduce((r, c) => (r[c] = true, r), {})
        keyword = keyword.split('').map(s => characters[s] ? `\\${s}` : s).join('[\\s\\n]*')
      }
      const reg = new RegExp(keyword, 'gmi')
      const matchList = []
      let match = reg.exec(content)
      while (match) {
        matchList.push(match)
        match = reg.exec(content)
      }
      return matchList
    },

    replaceMatchResult (textNodes, textList, matchList) {
      // 对于每一个匹配结果，可能分散在多个标签中，找出这些标签，截取匹配片段并用font标签替换出
      for (let i = matchList.length - 1; i >= 0; i--) {
        const match = matchList[i]
        const matchStart = match.index, matchEnd = matchStart + match[0].length // 匹配结果在拼接字符串中的起止索引
        // 遍历文本信息列表，查找匹配的文本节点
        for (let textIdx = 0; textIdx < textList.length; textIdx++) {
          const { text, startIdx, endIdx } = textList[textIdx] // 文本内容、文本在拼接串中开始、结束索引
          if (endIdx < matchStart) continue // 匹配的文本节点还在后面
          if (startIdx >= matchEnd) break // 匹配文本节点已经处理完了
          let textNode = textNodes[textIdx] // 这个节点中的部分或全部内容匹配到了关键词，将匹配部分截取出来进行替换
          const nodeMatchStartIdx = Math.max(0, matchStart - startIdx) // 匹配内容在文本节点内容中的开始索引
          const nodeMatchLength = Math.min(endIdx, matchEnd) - startIdx - nodeMatchStartIdx // 文本节点内容匹配关键词的长度
          if (nodeMatchStartIdx > 0) textNode = textNode.splitText(nodeMatchStartIdx) // textNode取后半部分
          if (nodeMatchLength < textNode.wholeText.length) textNode.splitText(nodeMatchLength)
          const font = document.createElement('font')
          font.setAttribute(this.flag, i + 1)
          font.innerText = text.substr(nodeMatchStartIdx, nodeMatchLength)
          textNode.parentNode.replaceChild(font, textNode)
        }
      }
    },

    replaceKeywords () {
      let flag = false
      if (this.regExp) {
        try {
          const reg = new RegExp(this.keyword)
          if (reg.test('')) flag = 1
        } catch (err) {
          flag = 1
        }
      }
      if (flag || !this.keyword) {
        this.contentShow = this.content
        return
      }
      const div = document.createElement('div')
      div.innerHTML = this.content
      const textNodes = this.getTextNodeList(div)
      const textList = this.getTextInfoList(textNodes)
      const content = textList.map(({ text }) => text).join('')
      const matchList = this.getMatchList(content, this.keyword)
      this.matchCount = matchList.length
      this.lightIndex = this.matchCount ? 1 : 0
      this.replaceMatchResult(textNodes, textList, matchList)
      this.contentShow = div.innerHTML
    },
    scrollTo (index) {
      this.$nextTick(() => {
        let node = this.$el.querySelector(`font[${this.flag}='${index}']`)
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
        style.setAttribute(this.flag, 1)
      }
      style.innerText = `font[${this.flag}]{${this.highlightStyle}}font[${this.flag}='${this.lightIndex}']{${this.currentStyle}}`
      document.head.appendChild(style)
    },
    clearStyle () {
      let style = document.head.querySelector(this.styleSelector)
      style && document.head.removeChild(style)
    }
  }
}
</script>
