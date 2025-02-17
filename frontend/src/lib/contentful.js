import { createClient } from 'contentful';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

export const getPage = async (slug) => {
  try {
    const response = await client.getEntries({
      content_type: 'page',
      'fields.title[match]': slug,
      limit: 1
    });

    if (response.items && response.items.length > 0) {
      return response.items[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export const getSponsors = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'sponsor',
      order: ['fields.name'],
    });

    if (!response.items) {
      throw new Error('Error fetching sponsors');
    }

    return response.items;
  } catch (error) {
    console.error('Error in getSponsors:', error);
    return [];
  }
};

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

export const getSources = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'source',
      order: 'fields.name'
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching sources:', error);
    return [];
  }
};