import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

type Props = {
    title: string,
    message: string,
    open: boolean
    handleClose (isAgree: boolean): void
}

const Confirm: React.FC<Props> = ({title, message, open, handleClose}) => {
  return (
      <Dialog
        open = {open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => handleClose(false)}>Disagree</Button>
          <Button onClick={() => handleClose(true)} autoFocus> Agree </Button>
        </DialogActions>
      </Dialog>
  );
}

export default Confirm;