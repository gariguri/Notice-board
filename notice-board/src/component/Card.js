import React, { useState, useEffect } from 'react'
import './NoticeBoard.css';
import axios from 'axios';
export default function Card({userid, id, title, body, setDatas}) {
  const [editTitle, setEditTitle]=useState(false);
  const [editBody, setEditBody]=useState(false);
  const [titleInput, setTitleInput]=useState(title);
  const [bodyInput, setBodyInput]=useState(body);
  //const [id, setId]=useState(-1);
  function handleEditTitle(){
    setEditTitle(true);

  }
  useEffect(() => {
    setTitleInput(title);
  }, [title]);

  useEffect(() => {
    setBodyInput(body);
  }, [body]);

  function handleEditBody(){
    setEditBody(true);

  }
  function handleTitleInput(e){
    setTitleInput(e.target.value);
    console.log(e.target.value);
  }
  function handleBodyInput(e){
    setBodyInput(e.target.value);
  }

  async function handleDelete(){
    try{
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      console.log('Post deleted successfully.');
      setDatas(prev => prev.filter(post => post.id !== id));
      

    }catch(error){
      console.error('Error updating title: ', error)
    }
  }

  async function onEditTitle(){
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { title: titleInput, body });
      setDatas(prev => prev.map(post => post.id === id ? { ...post, title: titleInput } : post));
      
    } catch (error) {
      console.error('Error updating title:', error);
    }

    setEditTitle(false);

  }
  async function onEditBody(){
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { title, body: bodyInput });
      setDatas(prev => prev.map(post => post.id === id ? { ...post, body:bodyInput } : post));
      
    } catch (error) {
      console.error('Error updating title:', error);
    }
   
    setEditBody(false);
  }
  function onNoEditBody(){
    setEditBody(false);
    setBodyInput(body);
  }
  function onNoEditTitle(){
    setEditTitle(false);
    setTitleInput(title);
  }
  return (
    <div className='postbox'>
      <div className='button'>
      <button className='delete' onClick={handleDelete}>x</button>
      </div>
      {editTitle ?<><input className="editTitle" placeholder='수정 입력' value={titleInput} onChange={(e)=>handleTitleInput(e)}></input>
      <div className='editbuttons'><button onClick={onEditTitle}>확인</button><button onClick={onNoEditTitle} >취소</button></div></> :
        <div className='title' onClick={handleEditTitle}>{title}
        </div>
        
      }
      
      {editBody ?<><textarea className='editBody' placeholder='수정 입력' value={bodyInput} onChange={(e)=>handleBodyInput(e)}/>
      <div className='editbuttons'><button onClick={onEditBody}>확인</button><button onClick={onNoEditBody}>취소</button></div></>: 
        <div className='body' onClick={handleEditBody}>{body}
        </div>
      }
    </div>
  
  )
}