import React,{useEffect,useState} from 'react';
import localStorage from 'localStorage';
import uuid from 'react-uuid';
import axios from 'axios';
import Navbar from './components/Navbar';
import AlignItemsList from './components/List';

function App() {
  const [loading,setloading]=useState(true);
  const [words,setWords]=useState([]);
  const [search,setSearch]=useState('');

  useEffect(()=>{
    const value=localStorage.getItem('uniqueId');
    if(value==null){
    const uid=uuid();
    axios({
      url:'/user/save',
      method:'post',
      data:JSON.stringify({uniqueId:uid}),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>{
    localStorage.setItem('uniqueId',uid);

    setloading(false);
    });
    }else{
        axios({url:'/user/getwords',
               data:JSON.stringify({uniqueId:value}),
               method:"post",
               headers:{
                 'Content-Type':'application/json'
               }
      }).then(res=>{
          setWords(res.data.u[0].words.reverse());
          setloading(false);
        });
    }
  },[]);


  return (
    <body>
    <div >
    {
      loading?<p>Loading...</p>:<div>
       <Navbar setSearch={setSearch}/>
       <div className='alignList'>
       <AlignItemsList words={words} setWords={setWords} search={search}/>
          </div>
      </div>
    }
    </div>
    </body>
  );
}

export default App;
