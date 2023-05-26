import axios from "axios";
import { useState } from "react";

export default function Home() {
  // State variables
  const [searchTerm, setSearchTerm] = useState("Book Title");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch search results from the API
  const getSearchResults = async () => {
    try {
      // Replace spaces with '+'
      let title = searchTerm.replace(/ /g, "+");
      setLoading(true); // Set loading state to true

      // Make a GET request to the API with the search term
      const { data } = await axios.get("api/search/", {
        params: { title },
      });
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // return the fetched data
  return (
    <div className="flex flex-col md:px-8 px-4 bg-background font-poppins items-center min-h-screen">
      <h1 className="md:text-6xl text-4xl font-bold text-primary mt-10">
        <span className="text-third">Books</span> Search
      </h1>
      <h2 className="text-primary text-0.5xl font-light mt-4 font-ebas">
        Search for any book using the Books API
      </h2>
      <form
        className="sm:mx-auto mt-10 justify-center sm:w-full sm:flex"
        onSubmit={(e) => {
          getSearchResults();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <input
          type="text"
          className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Enter a book title"
          defaultValue={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSearchResults(null);
          }}
        />

        <div className="mt-4 sm:mt-0 sm:ml-3">
          <button
            className="block w-full rounded-lg px-5 py-3 bg-third text-base text-primary font-bold hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary sm:px-10"
            type="submit"
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <>Search</>
            )}
          </button>
        </div>
      </form>

      {searchResults && (
        <div className="mt-10">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-3">

            {searchResults.map((book) => {
              return (
                <div key={book.book_id} className="pt-6">
                  <div className="flow-root bg-light rounded-lg px-4 pb-8">
                    <div className="-mt-6">
                      <div className="flex items-center justify-center">
                        <img
                          src={
                            // Remove compression to get higher quality
                            book.cover.replace(/._SX50_|._SY75_/gi, "")
                          }
                          className="p-2 w-64 rounded-lg"
                          alt={book.name}
                        />
                      </div>
                      <div className="text-center justify-center items-center">
                        <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">
                          {book.name}
                        </h3>
                        <p className="mt-2 text-base leading-relaxed text-secondary">
                          {book.authors[0]} ({book.year})
                        </p>
                        <span className="font-bold text-secondary">
                          Rating: {book.rating}
                        </span>
                        <a
                          href={book.url}
                          className="mt-3 block text-third underline"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              );

            })}

          </div>
        </div>
      )}

      <div className="mt-20 mb-10 text-center">
        <p className="text-primary text-xs">
          Created by Ris in May, 2023 
        </p>
      </div>
    </div>
  );
}
