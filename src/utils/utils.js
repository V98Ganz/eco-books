import axios from "axios";

const apiKey = "AIzaSyDGowX938GWNDn_tvsTpr8JuwfX7P-m2KI";

const request = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
});

export const fetchBooks = (title, author) => {
  return request
    .get(`volumes?q=${title}+inauthor:${author}&key=${apiKey}`)
    .then(({ data }) => {
      return data.items[0].volumeInfo;
    });
};

// const replaceSpacesForQuery = (string) => {
//   return string.replace(/\s/g, '+')
// }
