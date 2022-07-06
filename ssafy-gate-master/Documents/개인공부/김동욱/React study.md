# RestAPI와 통신하기 위한 방법 - axios

axois 예제

```react
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";
import usePromise from "../lib/usePromise";

//카테고리 값을 전달받아
const NewsList = ({ category }) => {
    //usePromise라는 커스텀 훅을 이용하여
  const [loading, response, error] = usePromise(() => {
      //query값에 따라 
    const query = category === "all" ? "" : `&category=${category}`;
      //axois 통신 주소를 변경한다
    return axios.get(
         //이때 향상된 ""인 ``를사용 (중간에 변수를 사용하기위해)
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=e4028f42e3a146a0bbd1257595226ee3`
    );
     //해당 작업은 카테고리 값이 변할때마다 진행
  }, [category]);
    
//진행상황에 따른 출력화면
  if (loading) {
    return <NewsListBlock>Waiting...</NewsListBlock>;
  }

  if (!response) {
    return null;
  }

  if (error) {
    return <NewsListBlock>Error!!!</NewsListBlock>;
  }
//해당하는 데이터 출력
  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};
```

