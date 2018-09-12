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