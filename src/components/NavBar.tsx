import React, { useState } from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
// import { useFetch } from "../libs/hooks";
import { searchUrl as url, headers } from "../libs/deezer";
import { SearchResults, Result } from "../types/interfaces";
interface Props {
  setData: (data: Result[]) => void;
}

export default function AppNavBar({ setData }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }
  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    fetchDeezer();
  }
  async function fetchDeezer() {
    try {
      // const { res, err, isLoading } = useFetch(url + searchQuery, headers);
      const res = await fetch(url + searchQuery, { headers: headers });
      if (res.ok) {
        const { data } = (await res.json()) as SearchResults;
        setData(data);
        console.log(data);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  }

  return (
    <Navbar className="bg-light justify-content-between">
      <Navbar.Brand>Typescript!</Navbar.Brand>
      <Form inline onSubmit={onSubmit}>
        <FormControl
          type="text"
          placeholder="Search"
          className=" mr-sm-2"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button onClick={fetchDeezer}>Search</Button>
      </Form>
    </Navbar>
  );
}
