
import React from "react";

export default function Confirm() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  return (
    <div>
      <button>Confirm</button>
    </div>
  );
}

            