import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { ISearchResult, ITrackId } from "../types/interfaces";
import { RouteComponentProps } from "react-router-dom";
import { searchTrachUrl as url, headers } from "../libs/deezer";

type Props = ISearchResult & RouteComponentProps;
type CustomType = React.MouseEvent<HTMLDivElement> & ITrackId;
export default function Home({ data }: Props) {
  // find unique albums
  // const [unique, setUnique]: [any, any] = useState([]);
  // useEffect(() => {
  //   setUnique(Array.from(new Set([data?.data])));
  // }, [data]);
  const handleTrack = (e: CustomType) => {
    console.log(e);
    fetchTrack(e.target.id);
  };
  const fetchTrack = async (id: number) => {
    try {
      const res = await fetch(url + id, { headers: headers });
      if (res.ok) {
        const payload = await res.json();
        console.log(payload);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
  return (
    <>
      <Container className="row mx-auto ">
        {data?.data?.map((entry: any, i: number) => (
          <Card
            key={`home${i}`}
            style={{ width: "18rem" }}
            className="mx-auto my-2"
            id={entry.id}
            onClick={handleTrack}
          >
            <Card.Img src={entry?.album?.cover_medium} />
            <Card.Title>{entry?.title_short}</Card.Title>
            <Card.Title>{entry?.artist.name}</Card.Title>
          </Card>
        ))}
      </Container>
    </>
  );
}
