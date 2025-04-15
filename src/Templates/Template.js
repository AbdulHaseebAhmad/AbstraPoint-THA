import { v4 as uuidv4 } from "uuid";

const createEmptyRow = (
  bookName,
  launchDate,
  author,
  cost,
  address,
  genre,
  recommended,
  city,
) => ({
  id: uuidv4(),
  "Book Name": bookName,
  "Launch Date": launchDate,
  Address: address,
  City: city,
  State: genre,
  Cost: cost,
  Recommended: recommended,
  "Bought From": "Amazon",
  "Citation 1": `${author}. (1999). *${bookName}*`,
  "Citation 2":
    "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/",
  "Citation 3": "ISBN: 978-0201616224",
  "Citation 4": "Programming Best Practices",
  "Citation 5": "Software Engineering Classics",
  Notes: `Essential read for software developers; filled with practical advice.`,
  Status: {
    Author: "Romail",
    "Read Status": "Read",
  },
});

const createRowsArray = () => {
  const booksData = [
    {
      name: "Sapiens: A Brief History of Humankind",
      launchDate: "2011-09-04",
      author: "Yuval Noah Harari",
      cost: 24.99,
      address: "Israel",
      city: "Tel Aviv",
      genre: "History / Anthropology",
      recommendation: "An insightful look at the evolution of humanity.",
    },
    {
      name: "The Silent Patient",
      launchDate: "2019-02-05",
      author: "Alex Michaelides",
      cost: 19.99,
      address: "United Kingdom",
      city: "London",
      genre: "Psychological Thriller / Fiction",
      recommendation: "A gripping psychological thriller with a shocking twist.",
    },
    {
      name: "Educated",
      launchDate: "2018-02-20",
      author: "Tara Westover",
      cost: 17.99,
      address: "USA",
      city: "Boise",
      genre: "Memoir / Autobiography",
      recommendation: "A powerful memoir about overcoming adversity.",
    },
    {
      name: "The Power of Habit",
      launchDate: "2012-02-28",
      author: "Charles Duhigg",
      cost: 18.99,
      address: "USA",
      city: "New York",
      genre: "Self-Help / Psychology",
      recommendation: "An enlightening exploration of how habits shape our lives.",
    },
    {
      name: "The Catcher in the Rye",
      launchDate: "1951-07-16",
      author: "J.D. Salinger",
      cost: 14.99,
      address: "USA",
      city: "New York",
      genre: "Fiction / Classic",
      recommendation: "A timeless classic that explores the struggles of adolescence.",
    },
    {
      name: "The Art of War",
      launchDate: "5th Century BC",
      author: "Sun Tzu",
      cost: 9.99,
      address: "China",
      city: "Luoyang",
      genre: "Strategy / Philosophy",
      recommendation: "A profound guide to strategy and leadership.",
    },
    {
      name: "Thinking, Fast and Slow",
      launchDate: "2011-10-25",
      author: "Daniel Kahneman",
      cost: 29.95,
      address: "Israel",
      city: "Tel Aviv",
      genre: "Psychology / Behavioral Science",
      recommendation: "A deep dive into human thinking and decision-making processes.",
    },
    {
      name: "The 7 Habits of Highly Effective People",
      launchDate: "1989-08-15",
      author: "Stephen R. Covey",
      cost: 19.99,
      address: "USA",
      city: "Provo",
      genre: "Self-Help / Personal Development",
      recommendation: "A foundational book for personal growth and leadership.",
    },
    {
      name: "The Hobbit",
      launchDate: "1937-09-21",
      author: "J.R.R. Tolkien",
      cost: 12.99,
      address: "United Kingdom",
      city: "Oxford",
      genre: "Fantasy / Adventure",
      recommendation: "A delightful classic of fantasy literature.",
    },
    {
      name: "The Immortal Life of Henrietta Lacks",
      launchDate: "2010-02-02",
      author: "Rebecca Skloot",
      cost: 16.99,
      address: "USA",
      city: "Baltimore",
      genre: "Biography / Science",
      recommendation: "A remarkable story of science, ethics, and one woman’s legacy.",
    },
];

  const rows = booksData.map((book) =>
    createEmptyRow(book.name, book.launchDate, book.author, book.cost,book.address,book.genre,book.recommendation,book.city)
  );

  return {
    id: uuidv4(),
    rows: rows,
  };
};

export default createRowsArray;
