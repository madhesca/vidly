import React from "react";

function Like({ liked, onClick }) {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <div>
      <i onClick={onClick} className={classes} aria-hidden="true"></i>
    </div>
  );
}

export default Like;
