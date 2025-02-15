import { createClient } from 'contentful';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

export const getArticles = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'article',
      include: 2, // This will include linked entries 2 levels deep
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};