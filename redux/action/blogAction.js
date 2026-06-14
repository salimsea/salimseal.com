const { default: axios } = require("axios");
const { setDataBlogs, setDataBlog, appendDataBlogs } = require("redux/slice/blogSlice");

export const getDataBlogs = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.BASE_URL}/api/blog`)
      .then((res) => {
        dispatch(
          setDataBlogs({
            items: {
              contents: res.data.retContents,
              category: res.data.retCategory,
            },
          })
        );
      })
      .catch((err) => {
        dispatch(
          setDataBlogs({
            msg: err.message,
          })
        );
      });
  };
};

export const getMoreDataBlogs = (start, max = 10) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
        start: String(start),
        max: String(max),
      })
      .then((res) => {
        dispatch(
          appendDataBlogs({
            items: {
              contents: res.data.data.retContents,
              category: res.data.data.retCategory,
            },
          })
        );
        return res.data.data.retContents;
      })
      .catch((err) => {
        dispatch(
          appendDataBlogs({
            msg: err.message,
          })
        );
        throw err;
      });
  };
};
export const getDataBlog = (slug) => {
  return (dispatch) => {
    axios
      .get(`${process.env.BASE_URL}/api/blog/${slug}`)
      .then((res) => {
        console.log(res.data);
        dispatch(
          setDataBlog({
            items: res.data,
          })
        );
      })
      .catch((err) => {
        dispatch(
          setDataBlog({
            msg: err.message,
          })
        );
      });
  };
};
