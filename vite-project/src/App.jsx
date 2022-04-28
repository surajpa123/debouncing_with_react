import { useCallback, useState } from 'react'
import './App.css'

function App() {

  const [search,setSearch] = useState()

  const debounce = (func)=>{
    let timer;
return function(...args){
  const context = this;
  if(timer) clearTimeout(timer)
  timer = setTimeout(()=>{ 
    timer = null
    func.apply(context,args)
  }, 500)
}
  }


  const handelChange = (event)=>{
    const value = event.target;
    fetch( `https://demo.dataverse.org/api/search?q=${value}`).then(
      res=> res.json()).then(JSON => setSearch(JSON.data.items))
  }

    //usecallbak provides the memoized callback


  const optimized = useCallback(debounce(handelChange),[])


  return (
    <div className="App">
     <h1>Search Bar</h1>
<input type="text" placeholder='Enter Something to Search' className='search' onChange={optimized}/>
<br />
{search?.length > 0 && 
<div className='autocomplete'>
{search?.map((el) => 
<div className='items'>
<span>{el.name}</span>
   </div>

)}
</div>

}
    </div>
  )
}

export default App
