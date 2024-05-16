import React, { useState } from 'react'
import axios from "axios";
export default function NewPost({setAddPost, setDatas}) {
    const [inputTitle, setInputTitle]=useState("");
    const [inputBody, setInputBody]=useState("");
    const url="https://jsonplaceholder.typicode.com/posts";
    function onChangeTitle(e){
        const title=e.target.value;
        setInputTitle(title);
    }
    function onChangeBody(e){
        const body=e.target.value;
        setInputBody(body);
    } 
    function onClickStore(){
        const newPost = {
            title: inputTitle,
            body: inputBody
        };
        axios.post(url, newPost)
        .then(response => {
            console.log('Success:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        setAddPost(false);
        setDatas(prev=>[newPost, ...prev])
    }

    function onClickCancel(){
        
        setAddPost(false);

    }
  return (
    <div className='newPost'>
        <div className='newPost-title'>
        <label  >제목</label>
        <input placeholder='제목을 입력하세요.' onChange={(e)=>onChangeTitle(e)} ></input>
        </div>
        <div className='newPost-content'>
        <label >내용</label>
        <textarea type="text" placeholder='내용을 입력하세요.'  onChange={onChangeBody} ></textarea>
        </div>
        <div className="addPostButton">
            <button className='store' onClick={onClickStore}>저장</button>
            <button className='cancel' onClick={onClickCancel}>취소</button>
        </div>
    </div>
  )
}
