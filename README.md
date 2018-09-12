# wx-redux
微信小程序中使用redux
### 创建store
```JS
const  {createStore} =require('./lib/redux')

const defaultState={
  user:{
    name:124
  }
}

const  reducer=(state=defaultState,{type,payload})=>{
  if(!type || typeof type !== 'string')throw new Error('type must be a string')
  if(payload&& typeof payload !=='object') throw new TypeError('payload must be an object')
  const typeState=state[type]||{}
  return {
    ...state,
    [type]: { ...typeState,...payload},
  }
}

const store=createStore(reducer)
module.exports = store;
```
### app监听数据变化
```JS
onLaunch: function () {
    // 展示本地存储能力
    this.store.subscribe(()=>{
      console.log('redux state',this.store.getState())
    })
}
```
### connect方法将state的数据写进data
```JS
const connect =(mapState)=>{
  if(typeof mapState !== 'function') throw new TypeError('mapState must be a function')
  const {store}=getApp()
  return (pageConfig)=>{
    if(!store) {
      throw new TypeError('store is not exit')
    }
    const { onLoad: _onLoad, onUnload: _onUnload, ...rest } = pageConfig
    function handleSubscribe(){
      const  data=mapState(store.getState())
      this.setData({...data})
    }
    function onLoad(options){
      handleSubscribe.call(this,options)
      this.unsubscribe=store.subscribe(handleSubscribe.bind(this,options))

      if(typeof _onLoad === 'function'){
        _onLoad.call(this,options)
      }
    }
    function onUnload(){
        if(typeof _onUnload === 'function'){
          _onUnload.call(this)
        }
      if (typeof this.unsubscribe === 'function'){
        this.unsubscribe()
      }
    }
    return Object.assign({}, {onLoad, onUnload},rest)
  }
}
module.exports = connect;
```
### page 页面的使用以及mapState方法
```JS
const mapState=(state)=>({
  ...state
})
 app.setState('user',{
   name:888,
   age:123,
})
// 读取直接 this.data.user 就可以获取到
```
```bash
现在就可以在微信小程序中使用redux了  是不是比globalData多了很多逼格
```


