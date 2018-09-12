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