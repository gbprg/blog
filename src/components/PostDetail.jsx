import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./PostDetail.module.css";

export default function PostDetail({ post }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(post.image);
  }, [post]);

  return (
    <>
      <div className={styles.post_detail}>
        {imageUrl ? (
          <img src={imageUrl} alt="Imagem do Firebase" />
        ) : (
          <p className={styles.createdBy}>Carregando imagem...</p>
        )}
        <h2>{post.title}</h2>
        <p>{post.createdBy}</p>
        <div className={styles.tags}>
          {post.tagsArray?.map((tag) => (
            <p key={tag}>
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>
        <Link to={`/posts/${post.id}`} className="btn btn-outline">
          Ler
        </Link>
      </div>
    </>
  );
}
