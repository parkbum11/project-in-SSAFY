import axios from "axios";

export const NoticeGet = () => {
  return axios.get(`/api/articles`);
};

export const NoticeMake = (newNotice) => {
  return axios
    .post("/api/articles/", {
      title: newNotice.title,
      content: newNotice.content,
      pro_id: newNotice.pro_id,
    })
    .then((res) => {
      console.log("Registered");
    });
};

export const NoticePatch = (id, newNotice) => {
  return axios
    .patch(`/api/articles/${id}`, {
      title: newNotice.title,
      content: newNotice.content,
    })
    .then((res) => {
      console.log("Update");
    });
};

export const NoticeDelete = (target) => {
  return axios.delete(`/api/articles/${target}`).then((res) => {
    console.log("Delete");
  });
};
