import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ListItem(props){
  const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  console.log('open');
  setOpen(true);
};
const handleClose = () => {
  console.log('close');
  setOpen(false);
};

  console.log(props.data.examples);
  return (
    <div>
    <Dialog onClose={handleClose} aria-labelledby={props.data.word} open={open}>
    <DialogTitle id={props.data.word} onClose={handleClose}>
     <b>{props.data.word}</b>
    </DialogTitle>
    <DialogContent dividers>
        <i style={{color:'grey'}}>{props.data.etymologies}</i>
        <br/>
        <br/>
        <h5>{props.data.description}</h5>
        <br/>
       <h6><b>Examples</b></h6>
        {props.data.examples.map((i) => {
          return <p>{i.text}</p>
        })

        }
    </DialogContent>

  </Dialog>
    <div style={{cursor:'pointer'}} onClick={handleClickOpen}>
       <h4><b>{props.data.word}</b></h4>
       <span style={{fontFamily:'Kumb Sans',color:'grey'}}>{props.data.description}</span>
       <hr/>

    </div>
    </div>
  )
}
