import logo from "./logo.svg";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import SearchFilter from "./SearchFilter";
import List from "./List";
import ItemImage from "./ItemImage";
import InfiniteScroll from "react-infinite-scroller";
import env from "react-dotenv";

function App() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSearch, setDataSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadmore, setIsLoadmore] = useState(false);
  const observerTarget = useRef(null);
  const loadMore = useCallback(() => {
    console.log("Load");
    const load = async () => {
      setIsSearching((pre) => true);
      console.log(dataSearch)
      console.log(currentPage)
      const list = await fectchApi(dataSearch, currentPage + 1);
      setCurrentPage((pre) => (pre += 1));

      setIsSearching((pre) => false);
      setFilteredItems((pre) => [...pre, ...list]);
    };
    load();
  });
  const handleFilterChange = async (searchTerm) => {
    setDataSearch((pre) => searchTerm);
    // console.log("searchItem :", searchTerm);
    setCurrentPage((pre) => 1);
    setIsSearching((pre) => true);
    const list = await fectchApi(searchTerm, 1);
    setIsSearching((pre) => false);

    console.log("Search list", list);
    setFilteredItems((pre) => [...list]);
  };
  useEffect(() => {
    const getData = async () => {
      const list = await fectchApi("office", currentPage);
      // console.log("Effect ",list);
      setDataSearch((pre) => "office");

      setFilteredItems((pre) => [...list]);
    };
    getData();
  }, []);
  useEffect(() => {
    console.log("filteredItems");
    console.log(filteredItems);
  }, [filteredItems]);
  useEffect(() => {
    console.log("dataSearch");
    console.log(dataSearch);
  }, [dataSearch]);
  useEffect(() => {
    console.log("isLoadmore");
    console.log(isLoadmore);
    if(isLoadmore){
      const load = async () => {
        setIsSearching((pre) => true);
        console.log(dataSearch)
        console.log(currentPage)
        const list = await fectchApi(dataSearch, currentPage + 1);
        setCurrentPage((pre) => (pre += 1));
  
        setIsSearching((pre) => false);
        setFilteredItems((pre) => [...pre, ...list]);
      };
      load();
      setIsLoadmore(pre=>false);

    }
  }, [isLoadmore]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadmore(pre=>true);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);
  const listItems = filteredItems.map((item, index) => (
    <ItemImage imageInfo={item} />
  ));
  return (
    <div className="App">
      <div className="d-flex justify-content-center fixed-header">
        <SearchFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="d-flex justify-content-center m-5">
        <div
          className="d-flex flex-wrap p-1 justify-content-center"
          style={{ gap: "1rem", maxWidth: "80%" }}
        >
          {filteredItems && listItems}
          {isSearching && <p className="w-100 text-center">Loading...</p>}
          <div ref={observerTarget}></div>
          {/* {filteredItems && filteredItems.json()} */}
        </div>
        {/* <li className="square" key={index}>{item}</li> */}
      </div>
    </div>
  );
}
const fectchApi = (query, page) => {
  console.log("Query");
  console.log(query, page);
  const baseUrl = "https://api.unsplash.com/search/photos"; // Replace with the API endpoint URL
  const apiKey = env.apiKey; // Replace with your API key
  console.log("env.apiKey");
  console.log(env.apiKey);
  // Define your query parameters
  const queryParams = new URLSearchParams();
  queryParams.set("page", page);
  queryParams.set("query", query);
  queryParams.set("per_page", 8);
  queryParams.set("client_id", apiKey);

  // Construct the URL with the query parameters
  const apiUrl = `${baseUrl}?${queryParams.toString()}`;

  // Make the API request using the fetch function
  const data = fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      // Process the API response data here
      return data.results;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  return data;
};
export default App;
