# vue-search-highlight
Vue文本关键字高亮组件，v1.1.0开始支持HTML内容跨标签匹配关键字。

## 安装
```bash
# 使用yarn
yarn add vue-search-highlight

# 使用npm
npm install vue-search-highlight​
```

## 引入组件
像使用普通组件一样使用vue-search-highlight。
```js
import SearchHighlight from 'vue-search-highlight'
// 注册为子组件
components: {
  'search-highlight': SearchHighlight
},​
```

## 组件props
| 名称 | 说明 |
| --- | --- |
| content | 需要展示的文本，搜索即在这个文本中进行。 |
| keyword | 搜索关键字 |
| highlightStyle | 所有关键词高亮的样式, 默认'background: #ffff00' |
| currentStyle | 当前搜索到的关键词样式, 默认default: 'background: #ff9632' | 
| regExp | 启用正则匹配，会用关键词构建一个正则表达式来匹配。启用时请确保keyword能正确构造正则表达式，并且不会匹配空串，否则组件将不会匹配任何内容 |

## 组件事件
| 事件名 | 说明 |
| --- | --- |
| ＠current-change | 返回值：当前关键词索引（从1开始）。关键词改变的时候，如果搜索到内容，会返回1，搜索不到则返回0。 |
| ＠match-count-change | 	返回值：文本匹配关键词总数。 |

## 组件方法，可以通过ref调用
主要提供了关键词滚动到可视区域的方法：
| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| searchNext | 无 | 下一个关键词滚动到可视区域 |
| searchLast | 无 | 上一个关键词滚动到可视区域 |
| scrollTo | index | 滚动到第index（从1开始）个关键词 |

## 使用示例：
效果在线预览：https://wintc.top/laboratory/#/search-highlight

代码示例
```html
<search-highlight
  class="search-highlight"
  ref="search"
  @current-change="currentChange"
  @match-count-change="matchCountChange"
  :content="content"
  :keyword="keyword">
</search-highlight>

<script>
import SearchHighlight from 'vue-search-highlight'

export default {
  components: {
    SearchHighlight
  },
  data () {
    return {
      currentIdx: 0,
      matchCount: 0,
      keyword: '明月',
      content: `
            春江花月夜
                [唐] 张若虚
      春江潮水连海平，海上明<b>月</b>共潮生。
      滟滟随波千万里，何处春江无月明！
      江流宛转绕芳甸，月照花林皆似霰；
      空里流霜不觉飞，汀上白沙看不见。
      江天一色无纤尘，皎皎空中孤月轮。
      江畔何人初见月？江月何年初照人？
      人生代代无穷已，江月年年望相似。
      不知江月待何人，但见长江送流水。
      白云一片去悠悠，青枫浦上不胜愁。
      谁家今夜扁舟子？何处相思明<b>月</b>楼？
      可怜楼上月徘徊，应照离人妆镜台。
      玉户帘中卷不去，捣衣砧上拂还来。
      此时相望不相闻，愿逐月华流照君。
      鸿雁长飞光不度，鱼龙潜跃水成文。
      昨夜闲潭梦落花，可怜春半不还家。
      江水流春去欲尽，江潭落月复西斜。
      斜月沉沉藏海雾，碣石潇湘无限路。
      不知乘月几人归，落月摇情满江树。`,
    }
  },
  methods: {
    searchNext () {
      this.$refs.search.searchNext()
    },
    searchLast () {
      this.$refs.search.searchLast()
    },
    matchCountChange (count) {
      this.matchCount = count
    },
    currentChange (idx) {
      this.currentIdx = idx
    },
    checkKeydown (event) {
      if (event.shiftKey) {
        this.searchLast()
      } else {
        this.searchNext()
      }
    }
  }
}
</script>
```