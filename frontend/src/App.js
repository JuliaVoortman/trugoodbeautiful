import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import './App.css';

const contentfulClient = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'article',
          order: '-sys.createdAt',
          limit: 10,
        });
        
        setArticles(response.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    }
    
    fetchArticles();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TrugoodBeautiful</h1>
        <p>Celebrating what's right with the world</p>
      </header>
      
      <main>
        {loading ? (
          <p>Loading articles...</p>
        ) : articles.length > 0 ? (
          <div className="articles-grid">
            {articles.map(article => (
              <div key={article.sys.id} className="article-card">
                <h2>{article.fields.title}</h2>
                <p>{article.fields.summary}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No articles found. Please add some in Contentful.</p>
        )}
      </main>
    </div>
  );
}

export default App;