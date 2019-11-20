# vue-search-highlight

<p>
  组件需要传入文本content以及关键词keyword，组件会渲染出一个包含content并且关键词被font元素替换的div元素。
  <br />
  组件功能如下：
</p>
<ul>
  <li>
    关键词高亮
  </li>
  <li>
    关键词匹配总数以及当前关键词的索引（即是第几个搜索结果）
  </li>
  <li>
    查找上一个、下一个功能，调用相应函数即可跳到上一个或者下一个
  </li>
</ul>
<p>
  使用方法：
</p>
<ol>
  <li>
    安装组件，使用npm或者yarn
    <br />
    <pre class="language-javascript">
      <code>
        // 如果使用yarn yarn add vue-search-highlight // 如果使用npm npm add vue-search-highlight​
      </code>
    </pre>
  </li>
  <li>
    引入
    <br />
    vue-search-highlight本身是一个组件，在需要搜索高亮的页面里引入后，像正常的组件一样使用即可。
    <br />
    <pre class="language-javascript">
      <code>
        import SearchHighlight from 'vue-search-highlight' // 注册为子组件 components:
        { 'search-highlight': SearchHighlight },​
      </code>
    </pre>
  </li>
  <li>
    props
    <br />
    <table border="1" style="border-collapse: collapse; width: 101.425%; height: 284px;"
    height="80">
      <tbody>
        <tr style="height: 37px;">
          <td style="width: 25.2077%; height: 37px;">
            props
          </td>
          <td style="width: 36.4728%; height: 37px;">
            说明
          </td>
          <td style="width: 406.281%; height: 37px;">
            备注
          </td>
        </tr>
        <tr style="height: 37px;">
          <td style="width: 25.2077%; height: 37px;">
            content
          </td>
          <td style="width: 36.4728%; height: 37px;">
            需要展示的文本，搜索即在这个文本中进行。
          </td>
          <td style="width: 406.281%; height: 37px;">
          </td>
        </tr>
        <tr style="height: 37px;">
          <td style="width: 25.2077%; height: 37px;">
            keyword
          </td>
          <td style="width: 36.4728%; height: 37px;">
            关键词
          </td>
          <td style="width: 406.281%; height: 37px;">
          </td>
        </tr>
        <tr style="height: 61px;">
          <td style="width: 25.2077%; height: 61px;">
            highlightStyle
          </td>
          <td style="width: 36.4728%; height: 61px;">
            关键词高亮的CSS样式
          </td>
          <td style="width: 406.281%; height: 61px;">
            非必传，参照浏览器搜索，默认设置背景为黄色#ffff00
          </td>
        </tr>
        <tr style="height: 45px;">
          <td style="width: 25.2077%; height: 45px;">
            currentStyle
          </td>
          <td style="width: 36.4728%; height: 45px;">
            <span style="background-color: #f6f8fa;">
              当前关键词高亮的CSS样式
            </span>
          </td>
          <td style="width: 406.281%; height: 45px;">
            <span style="background-color: #f6f8fa;">
              非必传，
            </span>
            参照浏览器搜索，默认设置背景为橘黄色#ff9632
          </td>
        </tr>
      </tbody>
    </table>
    &nbsp;
  </li>
  <li>
    events
    <br />
    组件有两个重要的数据，即搜索匹配数量和当前关键词索引，会通过$emit弹射出来，如果需要展示搜索索引和匹配总数（比如 3 / 16），你可以监听组件的这两个事件：
    <br />
    <table border="1" style="border-collapse: collapse; width: 100.19%; height: 223px;">
      <tbody>
        <tr style="height: 37px;">
          <td style="width: 51.3083%; height: 37px;">
            事件名
          </td>
          <td style="width: 48.6917%; height: 37px;">
            返回值
          </td>
        </tr>
        <tr style="height: 61px;">
          <td style="width: 51.3083%; height: 61px;">
            ＠current-change
          </td>
          <td style="width: 48.6917%; height: 61px;">
            返回值：当前关键词索引。
            <br />
            关键词改变的时候，如果搜索到内容，会返回1，搜索不到则返回0。
          </td>
        </tr>
        <tr style="height: 71px;">
          <td style="width: 51.3083%; height: 71px;">
            ＠mactch-count-change
          </td>
          <td style="width: 48.6917%; height: 71px;">
            返回值：文本匹配关键词总数。
          </td>
        </tr>
      </tbody>
    </table>
  </li>
  <li>
    methods
    <br />
    你可以通过ref引用组件，直接调用组件内部的一些方法：
    <br />
    <table border="1" style="border-collapse: collapse; width: 100.094%; height: 260px;"
    height="204">
      <tbody>
        <tr style="height: 37px;">
          <td style="width: 33.3333%; height: 37px;">
            方法名
          </td>
          <td style="width: 37.3752%; height: 37px;">
            参数
          </td>
          <td style="width: 29.2914%; height: 37px;">
            说明
          </td>
        </tr>
        <tr style="height: 37px;">
          <td style="width: 33.3333%; height: 37px;">
            searchNext
          </td>
          <td style="width: 37.3752%; height: 37px;">
            无
          </td>
          <td style="width: 29.2914%; height: 37px;">
            下一个关键词滚动到可视区域
          </td>
        </tr>
        <tr style="height: 37px;">
          <td style="width: 33.3333%; height: 37px;">
            searchLast
          </td>
          <td style="width: 37.3752%; height: 37px;">
            <span style="background-color: #f6f8fa;">
              无
            </span>
          </td>
          <td style="width: 29.2914%; height: 37px;">
            上一个关键词滚动到可视区域
          </td>
        </tr>
        <tr style="height: 61px;">
          <td style="width: 33.3333%; height: 61px;">
            scrollTo
          </td>
          <td style="width: 37.3752%; height: 61px;">
            index
          </td>
          <td style="width: 29.2914%; height: 61px;">
            滚动到第index（从1开始）个关键词
          </td>
        </tr>
      </tbody>
    </table>
    　
  </li>
</ol>

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```
