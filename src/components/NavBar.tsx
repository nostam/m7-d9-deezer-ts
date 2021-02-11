import React, { useState } from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
// import { useFetch } from "../libs/hooks";
import { searchUrl as url, headers } from "../libs/deezer";
interface Props {
  setData: (data: any) => void;
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
  const fetchDeezer = async () => {
    try {
      // const { res, err, isLoading } = useFetch(url + searchQuery, headers);
      const res = await fetch(url + searchQuery, { headers: headers });
      if (res.ok) {
        const data: any = await res.json();
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
