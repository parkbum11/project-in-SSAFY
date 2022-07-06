import React, { useState, useEffect, useRef } from "react";

//style
import { Button } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import moment from "moment";

const NoticeItem = ({
  id,
  title,
  content,
  updatedAt,
  pro_id,
  onRemove,
  onModify,
}) => {
  //const { id, title, content, createdAt, updatedAt, pro_id } = noticedata;

  const dateData = moment(updatedAt).format("YYYY-MM-DD");

  const [form, setForm] = useState([]);
  const { mtitle, mcontent } = form;

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  return (
    <div>
      <Button onClick={handleClickOpen("paper")}>
        {dateData} : {title}
      </Button>

      <Dialog
        open={open}
        fullWidth="true"
        maxWidth="md"
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <input
            type="text"
            id="title_txt"
            name="title"
            value={mtitle}
            defaultValue={title}
            onChange={onChange}
          />
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            마지막 수정 날짜 : {dateData}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            multiline="true"
            id="content_txt"
            name="content"
            value={mcontent}
            defaultValue={content}
            onChange={onChange}
            fullWidth
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button
            onClick={() => {
              onModify(id, form);
              setOpen(false);
            }}
            color="primary"
          >
            수정
          </Button>
          <Button
            onClick={() => {
              onRemove(id);
              setOpen(false);
            }}
            color="primary"
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NoticeItem;
