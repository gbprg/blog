import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

import { useEffect, useState } from "react";

import styles from "./EditPost.module.css";

export default function EditPost() {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setImage(post.image || "");
      setBody(post.body || "");
      setTags(post.tags || "");
    }
  }, [post]);

  const { user } = useAuthValue();
  const { updateDocument } = useUpdateDocument("posts");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validando url da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem preicsa ser uma URL");
    }

    // criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Preencha todos os campos");
      return;
    }
    if (formError) {
      return;
    }

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };
    updateDocument(id, data);
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h1>Editando Post: {post?.title}</h1>
          <p>Altere os dados do post como desejar</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="">
              <span>Título:</span>
              <input
                type="text"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="">
              <span>Url da imagem:</span>
              <input
                type="text"
                name="image"
                required
                onChange={(e) => setImage(e.target.value)}
                title={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
            <label htmlFor="">
              <span>Conteúdo:</span>
              <textarea
                name="body"
                required
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label htmlFor="">
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            <button className="btn" onSubmit={handleSubmit}>
              Editar
            </button>
          </form>
        </>
      )}
    </div>
  );
}
