import React from 'react';
import Post from '../../components/Post/Post';
import Home from '../../layouts/home';
import { Button, Container } from '../Main/styles';

const Main=()=>{
    return (
        <Home>
           <Container>
            <Button>글 작성하기</Button>
            <Post />
           </Container> 
        </Home>
    )
}

export default Main;