import React from "react";
import { img_300, unavailable } from "../../config/config";
import Badge from "@mui/material/Badge";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id = {id}>
      <Badge
        badgeContent={
          Number.isInteger(vote_average) && vote_average !== 0
            ? vote_average
            : vote_average.toFixed(1)
        }
        color={vote_average > 6 ? "primary" : "error"}
      />
      <img
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
        className="poster"
        style={{ borderRadius: "10px" }}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === `tv` ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
