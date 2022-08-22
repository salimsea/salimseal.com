import React from "react";
import Image from "next/image";
import styles from "styles/Blog.module.scss";
import { useSelector } from "react-redux";
import { IoTimeOutline } from "react-icons/io5";
import Link from "next/link";
import { DiscussionEmbed } from "disqus-react";

const SectionEntry = () => {
  const { dataBlog } = useSelector((state) => state.blog);
  return (
    <section className={styles["blog"]}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mb-4">
            {!dataBlog.error && (
              <>
                <div className={styles["card-detail-content"]}>
                  <center>
                    <h2>{dataBlog.items.item?.title}</h2>
                    <p>
                      Published : {dataBlog.items.item?.created} <br />
                      {dataBlog.items.item?.created !==
                        dataBlog.items.item?.updated && (
                        <>
                          <IoTimeOutline
                            size={15}
                            style={{ marginTop: -3, marginRight: 5 }}
                          />
                          Updated : {dataBlog.items.item?.updated}
                        </>
                      )}
                    </p>
                  </center>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataBlog.items.item?.postContent,
                    }}
                  />
                </div>
                <div className={`${styles["card-detail-content"]} mt-4`}>
                  <ItemDiscuss data={dataBlog} />
                </div>
              </>
            )}
          </div>
          <div className="col-md-4">
            <div className={styles["card-recent-post"]}>
              <h3>Recent Post</h3>
              <div className="mt-3">
                {!dataBlog.error &&
                  dataBlog.items?.recentPost?.map((v, i) => {
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
                            <Link href={`${v.slug}`}>
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
                  {!dataBlog.error &&
                    dataBlog.items?.category?.map((v, i) => {
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

const ItemDiscuss = ({ data }) => {
  const disqusShortname = "salimseal";
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${data.items.item?.slug}`,
    identifier: data.items.item?.slug,
    title: data.items.item?.title,
  };

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default SectionEntry;
