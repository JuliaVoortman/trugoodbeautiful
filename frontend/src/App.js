import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import ArticleDisplay from './components/ArticleDisplay';
import FilterSystem from './components/FilterSystem';
import ContinentsMap from './components/map/ContinentsMap';
import Footer from './components/Footer';
import './App.css';

const client = createClient({
 space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
 accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});
const Navigation = () => (
  <nav className="absolute bottom-0 right-0 p-6 z-10">
    <ul className="flex space-x-8">
      <li>
        <a href="#articles" className="text-white hover:text-slate-300 font-medium transition-colors">
          Articles
        </a>
      </li>
      <li>
        <a href="#about" className="text-white hover:text-slate-300 font-medium transition-colors">
          About
        </a>
      </li>
      <li>
        <a href="#donate" className="text-white hover:text-slate-300 font-medium transition-colors">
          Donate
        </a>
      </li>
    </ul>
  </nav>
);

const FeaturedStory = ({ article }) => (
 <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full max-h-72 flex flex-col">
   <div className="p-6 flex-grow">
     <div className="flex items-center gap-3 mb-4">
       <span className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">
         {article.fields?.allSidesBiasRating?.fields?.title || 'Center'}
       </span>
       <span className="text-emerald-600 text-sm font-medium flex items-center">
         <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></span>
         {article.fields?.sentimentType?.fields?.title || 'Positive'}
       </span>
     </div>

     <h2 className="text-xl font-semibold text-slate-800 mb-3 leading-tight">
       Featured Story
     </h2>

     <h3 className="text-lg font-medium text-slate-700 mb-2">
       {article.fields?.pageName}
     </h3>

     <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">
       {article.fields?.summary}
     </p>

     {article.fields?.image?.fields?.file?.url && (
       <img 
         src={`https:${article.fields.image.fields.file.url}`}
         alt={article.fields.image.fields.title || article.fields.pageName}
         className="w-full h-32 object-cover mb-4 rounded-lg"
       />
     )}

     <div className="flex flex-wrap gap-2">
       {article.fields?.sourceOutlet?.fields?.title && (
         <span className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-full">
           {article.fields.sourceOutlet.fields.title}
         </span>
       )}
       <span className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-full">
         {article.fields?.geographicLocation || 'Location unknown'}
       </span>
     </div>
   </div>
 </div>
);

function App() {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [selectedSentiment, setSelectedSentiment] = useState('positive');

 const sentiments = [
   { id: 'positive', label: 'The good stuff', color: 'bg-emerald-500' },
   { id: 'negative', label: 'The sad stuff', color: 'bg-amber-500' },
   { id: 'neutral', label: 'All the rest', color: 'bg-blue-500' }
 ];

 const filteredArticles = selectedSentiment === 'all' 
   ? articles
   : articles?.filter(article => 
       article.sentimentType?.title.toLowerCase() === selectedSentiment
     );

 useEffect(() => {
   const fetchArticles = async () => {
     try {
       console.log('Fetching articles...');
       console.log('Space ID:', process.env.REACT_APP_CONTENTFUL_SPACE_ID);
       console.log('Access Token exists:', !!process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN);
       
       const response = await client.getEntries({
         content_type: 'article',
         include: 2,
       });

       console.log('Raw Contentful response:', response.items[0]);
       
       const articleData = response.items.map((item) => ({
         ...item,
         coordinates: item.fields.geographicLocation ? [
           parseFloat(item.fields.geographicLocation.split(", ")[1]),
           parseFloat(item.fields.geographicLocation.split(", ")[0]),
         ] : null,
         sentimentType: item.fields.sentimentType?.fields || { title: 'neutral' }
       }));

       console.log('Processed article data:', articleData);
       
       setArticles(articleData);
       setLoading(false);
     } catch (err) {
       console.error('Error fetching articles:', err);
       console.error('Error details:', err.message);
       setError(err.message);
       setLoading(false);
     }
   };

   fetchArticles();
 }, []);

 if (loading) {
   return (
     <div className="min-h-screen flex items-center justify-center bg-stone-100">
       <div className="text-xl text-slate-300">Loading stories of progress...</div>
     </div>
   );
 }

 if (error) {
   return (
     <div className="min-h-screen flex items-center justify-center bg-stone-100">
       <div className="text-xl text-red-400">Error: {error}</div>
     </div>
   );
 }

 return (
   <div className="flex flex-col min-h-screen">
     {/* Hero Section */}
     <div className="relative">
       <div 
         className="absolute inset-0 bg-cover bg-center"
         style={{ 
           backgroundImage: `
             url(/pastoral-landscape.jpg)`,
         }}
       />
       
       <Navigation />

       <div className="relative z-10 h-full flex justify-left m-10 pl-10">
  <div>
    <img 
      src="/logo.svg" 
      alt="TruGoodBeautiful Logo" 
      className="h-24 mx-auto filter drop-shadow-lg" // Adjust height (h-16) as needed
    />
    <p className="text-lg text-white drop-shadow m-2">
    Finding light in the headlines
    </p>
  </div>
</div>
     </div>

     {/* Single Content Background Section */}
     <div className="flex-grow">
       <div className="max-w-7xl mx-auto px-0">
         {/* Sentiment Filter Tabs */}
         <div className="-mt-10 flex justify-start space-x-4 py-4 border-b border-slate-300 pl-4">
           {sentiments.map((sentiment) => (
             <button
               key={sentiment.id}
               onClick={() => setSelectedSentiment(sentiment.id)}
               className={`px-6 py-3 rounded transition-all duration-300 font-medium
                 ${selectedSentiment === sentiment.id
                   ? `${sentiment.color} text-white shadow-md`
                   : 'bg-white text-slate-600 hover:bg-slate-50'
                 }`}
             >
               {sentiment.label}
             </button>
           ))}
         </div>
         {/* Featured Story and Map Section */}
         <div className="pt-4 mb-10">
           <div className="flex flex-col lg:flex-row gap-6">
             <div className="lg:w-2/3">
               {articles[0] && <FeaturedStory article={articles[0]} />}
             </div>
             
             <div className="lg:w-1/3 flex flex-col">
               <div className="flex-grow">
                 <ContinentsMap />
               </div>
             </div>
           </div>
         </div>
         {/* Articles Section */}
         <div className="pt-12 mb-6">
           <ArticleDisplay articles={filteredArticles} />
         </div>
       </div>
     </div>
     <Footer />
   </div>
 );
}

export default App;