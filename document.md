### 第三次课：
**11-13节心得：**
承接上次课，前端获取数据
 在didmount之后请求数据，才存储到store中，虽然此时前后台共用store，且前端显示出了数据，
 但是由于server层返回dom时，store还是空，所以dom中没有数据。
解决办法：在server层就调用前端组件的loadData方法,获取数据, 且前后端store分离,通过window.__context将获取的数据传给client端.
 此时,client在didmount的时候,它的store也是充实的了.

**14节心得：**
承接上节课，首次登陆首页时，前端会获取到页面
如果首次登陆关于页，此时server端并没有调用loadData方法，所以server端store为空
再手动跳转首页，此时是前端跳转，前端没有发起请求，client端store一直为空。而后台在跳转时，调用loadData方法，所以server端的store是有值得，dom里面也体现了。

记录问题，每次跳转路由，都需要server端重新渲染，再发送给前台吗？

**作业**
1、如何解决promise.all()执行时，一个出错导致所有已经resolve的promise都失败的问题？
解决办法：在axios请求后追加catch，将错误捕获到，则最后promise数组就不会有这个异常项了，具体在/store/index.js的getIndexList()方法与/store/user.js的getDataInfo()中

2，将client端的请求，通过server端做代理，最后真正发起请求都从server端走？
解决办法：再想想