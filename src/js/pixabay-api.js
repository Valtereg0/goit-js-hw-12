import axios from 'axios';

const apiKey = '51401862-5106c302b458f745abd86383c';
const url = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const params = {
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page, 
    per_page: 15,
  };


  const response = await axios.get(url, { params });
  return response.data;
}


