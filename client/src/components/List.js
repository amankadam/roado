import React,{useEffect} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import ListItem from './ListItem';
import localStorage from 'localStorage';

const List=props=>{
  const [open, setOpen] = React.useState(false);
   const [word,setWord]= React.useState('');
   const [searchItems,setSearchItems]=React.useState([]);
   const [words,setWords]=React.useState([]);
   const [loading,setloading]=React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(()=>{
    setWords(props.words);
  },[]);

  useEffect(()=>{
    var temp=[];

    if(props.search.length>0){
    temp=props.words.filter(v=>{
      return v.word.toLowerCase().includes(props.search.toLowerCase());
    });
    setSearchItems(temp);
  }else{
    setSearchItems([]);
  }
  },[props.search])

  const handleClose = (e) => {
    setOpen(false);
  };
  const handleAdd = () => {
    var uid=localStorage.getItem('uniqueId');
    setloading(true);
    setOpen(false);
    axios({
      url:'/user/saveword',
      method:'post',
      data:
        JSON.stringify({
         uniqueId:uid,
         word:word
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      axios({url:'/user/getwords',
             data:JSON.stringify({uniqueId:uid}),
             method:"post",
             headers:{
               'Content-Type':'application/json'
             }
    }).then(res=>{
        setWords(res.data.u[0].words.reverse());
        props.setWords(res.data.u[0].words);
        setloading(false);
      });

    });
};
  const onChange=(e)=>{
    setWord(e.target.value);
  }

  return(
    <div className='list container card shadow'>
    {loading?<p>Adding {word}...</p>:''}
    {
      searchItems.length>0?
      searchItems.map((p)=>{
        return <ListItem data={p}/>
      }):
      words.map((p)=>{
        return <ListItem data={p}/>
      })
    }
    <div className='fab'>


    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Word</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          onChange={onChange}
          label="Enter a Word"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
    <Fab  color="secondary" aria-label="add" onClick={handleClickOpen}>
      <AddIcon />
    </Fab>
    </div>
    </div>
  )
}
export default List;
