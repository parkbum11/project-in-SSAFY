import React, { useState, useEffect } from "react";

import {
  NoticeGet,
  NoticeDelete,
  NoticeMake,
  NoticePatch,
} from "modules/NoticeFunctions";
//style
import { Grid, Button } from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import moment from "moment";

import NoticeItem from "./Detail/index";
import NoticeMaker from "./Create/index";

const Notice = ({ id }) => {
  const [flag, setFlag] = useState(0);

  const [notices, setNotices] = useState([
    {
      id: "",
      title: "",
      createdAt: "",
      updatedAt: "",
      pro_id: "",
    },
  ]);

  useEffect(() => {
    NoticeGet(id).then(({ data }) => setNotices(data));
  }, [flag, id]);

  const handleCreate = (form) => {
    NoticeMake(form);
    setFlag(flag + 1);
  };

  const HandlePatch = (id, form) => {
    NoticePatch(id, form);
    setFlag(flag + 1);
  };

  const Handledelete = (target) => {
    NoticeDelete(target);
    setFlag(flag + 1);
  };

  ///search
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const HandleSearchAll = () => {
    setSelectedDate("");
    setFlag(flag + 1);
  };

  return (
    <div
      style={{
        paddingBottom: "15px",
      }}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="날짜를 선택 해주세요"
            format="yyyy-MM-dd"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            invalidDateMessage=""
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={HandleSearchAll}
          style={{ margin: "20px" }}
        >
          전체 보기
        </Button>
        <NoticeMaker proId={id} onMake={handleCreate} />
      </Grid>
      {selectedDate !== ""
        ? notices
            .filter((notice) =>
              moment(notice.updatedAt)
                .format("YYYY-MM-DD")
                .includes(moment(selectedDate).format("YYYY-MM-DD"))
            )
            .map((notice, index) => (
              <div>
                <hr />
                <NoticeItem
                  key={index}
                  id={notice.id}
                  title={notice.title}
                  content={notice.content}
                  updatedAt={notice.updatedAt}
                  proId={id}
                  onRemove={Handledelete}
                  onModify={HandlePatch}
                />
              </div>
            ))
        : notices.map((notice, index) => (
            <div>
              <hr />
              <NoticeItem
                key={index}
                id={notice.id}
                title={notice.title}
                content={notice.content}
                createdAt={notice.createdAt}
                updatedAt={notice.updatedAt}
                proId={id}
                onRemove={Handledelete}
                onModify={HandlePatch}
              />
            </div>
          ))}
    </div>
  );
};

export default Notice;
