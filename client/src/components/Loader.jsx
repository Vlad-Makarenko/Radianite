import React from "react";

export const Loader = ({ info }) => (
  <div style={{ marginTop: "4rem" }}>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-red-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h1 className="white">{info}</h1>
    </div>
  </div>
);
