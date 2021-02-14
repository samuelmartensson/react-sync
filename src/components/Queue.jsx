import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../firebase";
import { getTitle, parseURLtoYoutubeID } from "../utils/helpers";
import { RoomContext } from "./Room";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  flex: 1 1 400px;
`;
const QueueWrapper = styled.div`
  padding: 0.75rem;
  overflow: auto;
  h2 {
    text-align: center;
  }
`;
const Item = styled.div`
  background: #532929;
  margin-bottom: 1rem;
  color: white;
  position: relative;
  overflow: hidden;
  border-radius: 0.25rem;
  height: 100px;

  animation: slideIn 300ms;

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    }
  }
  &::after {
    content: "";
    background: linear-gradient(45deg, #70aee952, #2082dfd1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  span {
    position: relative;
    display: block;
    padding: 1rem;
    z-index: 999;
    font-size: 1.25rem;
  }
  img {
    position: absolute;
    transform: translate(-0%, -50%);
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  margin-top: auto;
  padding: 0.75rem;
  padding-bottom: 0;
  grid-row: 1;
  @media (min-width: 1200px) {
    grid-row: unset;
  }

  input {
    padding: 0.5rem;
    padding-left: 0.75rem;
    border-radius: 200px;
    border: none;
    background: #f3f3f3;
    width: 100%;
    margin-bottom: 1rem;
  }
`;
const ButtonWrap = styled.div`
  display: flex;
  gap: 1rem;
  button {
    flex: 1;
    background: linear-gradient(45deg, #70aee9, #2082df);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 0.25rem;
    transition-duration: 80ms;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      box-shadow: 3px 3px 0px #0c3861;
      transform: translate(-3px, -3px);
    }
  }
`;

export default function Queue() {
  const [videoIdList, setVideoIdList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const { id } = useContext(RoomContext);

  function playNextVideo() {
    const [queueKey, nextVideo] = Object.entries(videoIdList)[0];
    const { videoId } = nextVideo;
    window.player.loadVideoById(videoId);

    database.ref(`/rooms/${id}`).update({
      videoId
    });
    database.ref(`/rooms/${id}/queue/${queueKey}`).remove();
  }

  function addToQueue() {
    setError("");
    const videoId = parseURLtoYoutubeID(inputValue);
    if (videoId !== false) {
      getTitle(videoId).then(res => {
        database.ref(`/rooms/${id}/queue`).push({
          title: res.items[0].snippet.title,
          videoId,
          thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`
        });
      });
      setInputValue("");
    } else {
      setError("Invalid URL");
    }
  }

  useEffect(() => {
    database.ref(`/rooms/${id}/queue`).on("value", snap => {
      setVideoIdList(snap.val());
    });
  }, [id]);

  useEffect(() => {
    // Keeps queue height consistent with video height
    function resize() {
      const queue = document.querySelector("#queue");
      const video = document.querySelector("#player").clientHeight;
      if (window.innerWidth > 1200) {
        queue.style = `height: ${video}px`;
      } else {
        queue.style = ``;
      }
      // Calls itself if video has not loaded yet (height === 0), timeout to avoid max callstack
      // Probably a bad solution
      if (video === 0) {
        setTimeout(() => {
          resize();
        }, 1000);
      }
    }
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Container id="queue">
      <QueueWrapper>
        {videoIdList ? (
          Object.entries(videoIdList).map((item, i) => {
            const { title, videoId, thumbnail } = item[1];
            return (
              <Item key={videoId + i}>
                <span>{title}</span>
                <img src={thumbnail} alt="thumbnail" />
              </Item>
            );
          })
        ) : (
          <h2>No videos queued</h2>
        )}
      </QueueWrapper>
      <InputWrapper>
        <div>{error && error}</div>
        <input
          placeholder="YouTube URL..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <ButtonWrap>
          <button onClick={addToQueue}>Add to queue</button>
          <button onClick={playNextVideo}>Next</button>
        </ButtonWrap>
      </InputWrapper>
    </Container>
  );
}
