import React, { useState, useEffect, useCallback } from "react";
import { Container, Card } from "react-bootstrap";
import { Result, IEventTrackId, Track } from "../types/interfaces";
import { RouteComponentProps } from "react-router-dom";
import { searchTrachUrl as url, headers } from "../libs/deezer";
interface HomeProps extends RouteComponentProps {
  data: Result[];
}
// interface CustomType extends React.MouseEvent {
//   target: Result;
// }

type CustomType = React.MouseEvent<HTMLDivElement> & IEventTrackId;

export default function Home({ data }: HomeProps) {
  // find unique albums
  // const [unique, setUnique]: [any, any] = useState([]);
  // useEffect(() => {
  //   setUnique(Array.from(new Set([data?.data])));
  // }, [data]);
  const [track, setTrack] = useState<Track>();
  // const handleClick = (fieldName: string) => (e: CustomType) => {
  //   console.log("clicked id", e.target.id, e.target.offsetParent.id);
  //   fetchTrack(e.target.id);
  // };
  const [trackId, setTrackId] = useState<number>();
  function handleClick(e: CustomType) {
    console.log("clicked id", e.target.id, e.target.offsetParent.id);

    const id: number = e.target.id ? e.target.id : e.target.offsetParent.id;
    // setTrackId(id);
    fetchTrack(id);
  }
  // useEffect(() => {
  //   fetchTrack(data[0]?.id);
  // }, []);
  // useEffect(() => {
  //   fetchTrack(trackId);
  // }, [trackId]);
  async function fetchTrack(id: number) {
    try {
      const res = await fetch(url + id, { headers: headers });
      if (res.ok) {
        const payload = (await res.json()) as Track;
        setTrack(payload);
        console.log("payload", payload.id, "state", track?.id);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return (
    <>
      <Container className="row mx-auto ">
        {data?.slice(0, 6).map((entry: Result) => (
          <Card
            key={entry.id}
            style={{ width: "18rem" }}
            className="mx-auto my-2"
            id={entry.id}
            // onClick={() => setTrackId(entry.id)}
            onClick={handleClick}
          >
            <Card.Img src={entry.album.cover_medium} />
            <Card.Title>{entry.title_short}</Card.Title>
            <Card.Title>{entry.artist.name}</Card.Title>
          </Card>
        ))}
      </Container>
    </>
  );
}
