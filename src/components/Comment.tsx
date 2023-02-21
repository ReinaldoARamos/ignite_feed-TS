import styles from "./Comment.module.css";
import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "./Avatar";
import { useState } from "react";

interface commentProps{
  content: string,
  deleteComment: (comment: string)=>void
}
export function Comment({content, deleteComment}: commentProps) {
  const [likeCount, setLikeCount] = useState(0); 

  function handleDelete() {
    deleteComment(content);
   // console.log(content)
  }
  function handleLikeCount() {
    setLikeCount((state ) =>{
      return state  + 1
    })

  }
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://i.pinimg.com/236x/cb/7e/87/cb7e8749021558f097169a16046af054.jpg" />
        <div className={styles.commentBox}>
        <div className={styles.commentContent}>
       <header>
       <div className={styles.authorAndTime}>
            <strong>Reinaldo Aparecido Ramos</strong>
            <time title="11 de maio as 08:31" dateTime="2022-05-11 08:13:00">
              Publico há 1h
            </time>
          </div>
          <button title="Deletar">
            <Trash size={24} onClick={handleDelete}/>
            </button>
       </header>
       <p>{content}</p>
       </div>  
        <footer>
            <button title="Aplaudir">
              
                <ThumbsUp  onClick={handleLikeCount} size={20} />
                 <span>  {likeCount}</span> 
                  
            </button>
        </footer>
        </div>
   
    </div>
  );
}
