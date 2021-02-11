import React, { useState } from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import { ObjectLiteral } from "../types/ObjectLiteral";
interface Props {
  setData: (data: ObjectLiteral) => void;
}

export default function AppNavBar({ setData }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetchDeezer();
  };
  const url = process.env.REACT_APP_DEEZER_SEARCH!;
  const headers = {
    "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY!,
    "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST!,
  };
  const fetchDeezer = async () => {
    try {
      const res = await fetch(url + searchQuery, { headers: headers });
      if (res.ok) {
        const data: ObjectLiteral = await res.json();
        setData(data);
        console.log(data);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

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
