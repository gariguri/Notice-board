import React, { useEffect, useState, createContext } from 'react'
import axios from "axios";
import Card from './Card';
import './NoticeBoard.css'
import NewPost from './NewPost';
export default function Board() {
    const [datas, setDatas]=useState([]);
    const [addPost, setAddPost]=useState(false);
    const url='https://jsonplaceholder.typicode.com/posts';
    function fetchData(url) {
        axios.get(url)
            .then(response => {
                const datas = response.data; // 응답 데이터를 변수에 저장
                setDatas(datas);
                console.log(datas); // 저장된 데이터를 콘솔에 출력
                // 여기서 필요한 작업을 수행하거나 저장된 데이터를 활용할 수 있습니다.
            })
            .catch(error => console.error('Error fetching data:', error)); // 요청이 실패하면 에러 처리
    }
  
    useEffect(()=>{fetchData(url);},[]);
    function onClickNewPost(){
        setAddPost(!addPost);

    }
  
    return (
      
       
        <>
        <div className='postHeader'> 
        <span className='bigTitle'>POST </span>
            <span className='postAdd'>
                <button onClick={onClickNewPost}>ADD NEW POST!</button>
            </span>
        </div>
        {addPost &&(
            <NewPost setAddPost={setAddPost} setDatas={setDatas} ></NewPost>

        )}
        <div className='posts'>
            
            {datas.map((data) => (
                <Card userid={data.userid} id={data.id} title={data.title} body={data.body} setDatas={setDatas}>
                </Card>
            ))}
        </div>
        </>
        
    
    )
}
