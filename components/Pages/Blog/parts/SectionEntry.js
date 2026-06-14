import React, { useEffect, useState, useRef, useCallback } from "react";
import { BlogDummy1, IMGNotFound } from "assets";
import Image from "next/image";
import styles from "styles/Blog.module.scss";
import { IoTimeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getDataBlogs, getMoreDataBlogs } from "redux/action/blogAction";
import Link from "next/link";
import { setFormBlog } from "redux/slice/blogSlice";

function getRandomIndices(length, count) {
  const indices = new Set();
  const targetCount = Math.min(length, count);
  while (indices.size < targetCount) {
    const randomIndex = Math.floor(Math.random() * length);
    indices.add(randomIndex);
  }
  return Array.from(indices);
}

const SectionEntry = () => {
  const { dataBlogs, formBlog } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);

  const datas = !formBlog.formBlog?.search
    ? dataBlogs.items?.contents
    : dataBlogs.items?.contents?.filter((i) =>
        i?.title
          ?.toLowerCase()
          .includes(formBlog.formBlog?.search.toLowerCase())
      );

  const randomIndices = dataBlogs.items?.contents
    ? getRandomIndices(dataBlogs.items.contents.length, 10)
    : [];

  useEffect(() => {
    if (dataBlogs.items?.contents) {
      const currentLength = dataBlogs.items.contents.length;
      if (currentLength > 0 && currentLength < 10) {
        setHasMore(false);
      }
    }
  }, [dataBlogs.items?.contents]);

  const loadMorePosts = useCallback(() => {
    const currentLength = dataBlogs.items?.contents?.length || 0;
    if (currentLength === 0) return;

    setLoading(true);
    const nextStart = currentLength + 1;

    dispatch(getMoreDataBlogs(nextStart, 10))
      .then((newContents) => {
        setLoading(false);
        if (!newContents || newContents.length < 10) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Failed to load more blogs:", err);
      });
  }, [dispatch, dataBlogs.items?.contents?.length]);

  const isSearchActive = !!formBlog.formBlog?.search;

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !isSearchActive) {
          loadMorePosts();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, loadMorePosts, isSearchActive]);

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
                <>
                  {datas?.map((v, i) => {
                    return (
                      <div key={i} className="col-md-6" data-aos="flip-left">
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
                  })}
                  {loading && (
                    <div className="col-12 text-center my-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  {hasMore && !isSearchActive && (
                    <div ref={sentinelRef} style={{ height: "20px", width: "100%", margin: "10px 0" }} />
                  )}
                </>
              ) : (
                <center>
                  <Image
                    src={IMGNotFound}
                    width={150}
                    height={200}
                    className={"pt-5"}
                    alt="Not Found"
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
              <h3>More Post</h3>
              <div className="mt-3">
                {!dataBlogs.error &&
                  randomIndices.map((i) => {
                    const v = dataBlogs.items.contents[i];
                    return (
                      <div
                        key={i}
                        className={`row ${styles["item-card"]}`}
                        data-aos="fade-left"
                      >
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
                        <li key={i} data-aos="fade-up">
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
