import React from "react";

//overkill, utils class?
const UnreadMessages = ({ length }) => {
  return (
    <>{length > 0 ? `${length} new message${length > 1 ? "s" : ""}` : ""}</>
  );
};

export default UnreadMessages;
