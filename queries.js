
// MongoDB Assignment Script - Week 1

// Task 1: Setup
// use plp_bookstore - To create a new database
db.createCollection("books")

// Task 2: Insert Books
db.books.insertMany([
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    published_year: 2008,
    price: 45.00,
    in_stock: true,
    pages: 464,
    publisher: "Prentice Hall"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    published_year: 2018,
    price: 20.00,
    in_stock: true,
    pages: 320,
    publisher: "Penguin"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 12.00,
    in_stock: false,
    pages: 328,
    publisher: "Secker & Warburg"
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    genre: "Programming",
    published_year: 1999,
    price: 55.00,
    in_stock: true,
    pages: 352,
    publisher: "Addison-Wesley"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    price: 15.00,
    in_stock: true,
    pages: 208,
    publisher: "HarperOne"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    published_year: 2011,
    price: 30.00,
    in_stock: true,
    pages: 498,
    publisher: "Harper"
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Psychology",
    published_year: 2011,
    price: 25.00,
    in_stock: false,
    pages: 499,
    publisher: "Farrar, Straus and Giroux"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self-help",
    published_year: 2016,
    price: 18.00,
    in_stock: true,
    pages: 304,
    publisher: "Grand Central"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    published_year: 1960,
    price: 10.00,
    in_stock: false,
    pages: 281,
    publisher: "J.B. Lippincott & Co."
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    genre: "Business",
    published_year: 2011,
    price: 22.00,
    in_stock: true,
    pages: 336,
    publisher: "Crown Business"
  }
])

// CRUD Queries
db.books.find({ genre: "Fiction" })
db.books.find({ published_year: { $gt: 2010 } })
db.books.find({ author: "Cal Newport" })
db.books.updateOne({ title: "Atomic Habits" }, { $set: { price: 22.00 } })
db.books.deleteOne({ title: "1984" })

// Advanced Queries
db.books.find({ $and: [ { in_stock: true }, { published_year: { $gt: 2010 } } ] })
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
db.books.find().sort({ price: 1 })
db.books.find().sort({ price: -1 })
db.books.find().limit(5)
db.books.find().skip(5).limit(5)

// Aggregation Pipelines
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

// Indexing
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: -1 })
db.books.find({ title: "Deep Work" }).explain("executionStats")
db.books.find({ author: "Yuval Noah Harari", published_year: 2011 }).explain("executionStats")
