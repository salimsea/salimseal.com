import React, { useEffect } from "react";
import { BlogDummy1, IMGNotFound } from "assets";
import Image from "next/image";
import styles from "styles/Blog.module.scss";
import { IoTimeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getDataBlogs } from "redux/action/blogAction";
import Link from "next/link";
import { setFormBlog } from "redux/slice/blogSlice";

const SectionEntry = () => {
  const { dataBlogs, formBlog } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const datas = !formBlog.formBlog?.search
    ? dataBlogs.items?.contents
    : dataBlogs.items?.contents?.filter((i) =>
        i?.title
          ?.toLowerCase()
          .includes(formBlog.formBlog?.search.toLowerCase())
      );
  return (
    <section className={styles["blog"]}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mb-4">
            <div>
              <input
                type="text"
                placeholder="Enter you keyword..."
                className={`form-control ${styles["textinput-search"]}`}
                value={formBlog.formBlog?.search}
                onChange={(e) =>
                  dispatch(
                    setFormBlog({ name: "search", value: e.target.value })
                  )
                }
              />
            </div>
            <div className="row mt-5">
              {!dataBlogs.error && datas?.length !== 0 ? (
                datas?.map((v, i) => {
                  return (
                    <div key={i} className="col-md-6">
                      <Link href={`blog/${v.slug}`}>
                        <div className={styles["card-post"]}>
                          <Image
                            width={450}
                            height={250}
                            src={v.thumbnail}
                            className={styles["img-post"]}
                            alt=""
                          />
                          <div
                            className={`${styles["bg-primary"]} py-3 mx-0 px-4`}
                          >
                            <small>
                              <IoTimeOutline
                                size={15}
                                className={styles["icon"]}
                              />
                              {v.created}
                            </small>
                            <h2>{v.title}</h2>
                            <p>{v.postContent}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <center>
                  <Image
                    src={IMGNotFound}
                    width={150}
                    height={200}
                    className={"pt-5"}
                  />
                  <p className="pt-5 pb-5">
                    Data not found :{" "}
                    <u>
                      <b>{formBlog.formBlog?.search}</b>
                    </u>
                  </p>
                </center>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles["card-recent-post"]}>
              <h3>Recent Post</h3>
              <div className="mt-3">
                {!dataBlogs.error &&
                  dataBlogs.items?.contents?.map((v, i) => {
                    return (
                      i < 5 && (
                        <div key={i} className={`row ${styles["item-card"]}`}>
                          <div className="col align-self-center">
                            <Image
                              width={400}
                              height={250}
                              src={v.thumbnail}
                              className={styles["img-recentpost"]}
                              alt=""
                            />
                          </div>
                          <div className="col">
                            <small>{v.updated}</small>
                            <Link href={`blog/${v.slug}`}>
                              <h6>{v.titleSmall}</h6>
                            </Link>
                            <p>{v.postContentSmall}</p>
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
            </div>
            <div className={styles["card-category-post"]}>
              <h3>Category</h3>
              <div className="mt-3">
                <ul>
                  {!dataBlogs.error &&
                    dataBlogs.items?.category?.map((v, i) => {
                      return (
                        <li key={i}>
                          <div className="bulet--small"></div>
                          {v}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionEntry;
