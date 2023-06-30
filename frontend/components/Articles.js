import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import PT from 'prop-types'
import axios from 'axios'

export default function Articles(props) {
  // ✨ where are my props? Destructure them here -- articles state from App
  const {articles, setArticles} = props;

  // ✨ implement conditional logic: if no token exists ---- DO THISSSSS!
  // we should render a Navigate from react router dom to login screen (React Router v.6)
  const token = localStorage.getItem('token');
  console.log('token:', token);
  

  useEffect(() => {
    // ✨ grab the articles here, on first render only
    // const token = localStorage.getItem('token');
    axios
      .get(
        'http://localhost:9000/api/articles', 
        { headers: {
            authorization: token
          }
        }
      )
      .then(resp =>{
        console.log('ARTICLES', resp);
        //store the response? in the state from App - prop - idk if i need to do this
        setArticles(resp.data.articles);
      })
      .catch(err=>{
        console.log(err);
      })
  }, [])

  if (!token) {
    return (
      <Navigate to='/'/>
    )
  }

  // console.log('ARTICLES STATE', articles)

  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {
        !articles.length
          ? 'No articles yet'
          : articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button disabled={true} onClick={Function.prototype}>Edit</button>
                  <button disabled={true} onClick={Function.prototype}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
