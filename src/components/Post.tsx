import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, useState } from "react";
import { Container } from "react-dom";

interface Author {
  name: string,
  role: string,
  avatarUrl: string
}

interface postProps{
  author: Author,
  publishedAt: Date,
  content: Content[]
}
interface Content{
  type: 'paragraph',
  content: string
}

export function Post({ author, publishedAt, content }  : postProps ) {
  const [comment, setComment] = useState(
    [
        "oi..."
    ]);  //criando o state e a função que altera o valor
    
    const [newCommentText , setnewCommentText] = useState(''); 

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'as' HH:mm'h",
    {
      locale: ptBr,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  });

  function deleteComment(commentToDelete : string) {
    const commentWithoutDeleteOne = comment.filter(comments=> {
      return comments != commentToDelete
    })
    
   setComment(commentWithoutDeleteOne)
  }
  function handleNewCommentChange(event : ChangeEvent<HTMLTextAreaElement>) {
    setnewCommentText(event.target.value);
   
  }
  function handleComment(event : FormEvent) {
    
    event.preventDefault();
   
   setComment([...comment, newCommentText])
   setnewCommentText('');
  }
  
  return (
    <article className={styles.Post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          }
        })}
      </div>

      <form onSubmit={handleComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea required placeholder="Deixe seu comentario" name="comment"  onChange={handleNewCommentChange} value={newCommentText} />
        <footer>
          <button type="submit" >Comentar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comment.map((comment) => {
          return <Comment content={comment} deleteComment={deleteComment}/>;
        })}
      </div>
    </article>
  );
}