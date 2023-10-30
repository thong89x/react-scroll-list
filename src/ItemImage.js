import React, { useEffect, useState } from "react";

export default function ItemImage(props) {
  return (
    <div className="card" id={props.imageInfo.id} key={"card-"+props.imageInfo.id+props.index} style={{ width: "18rem" }}>
        <>
          <img
          key={'image-'+props.imageInfo.id}
            src={props.imageInfo.urls.regular}
            className="card-img-top"
            alt= {props.imageInfo.alt_description}
          />
          <div key={'card-body-'+props.imageInfo.id} className="card-body">
            <h5 className="card-title">{props.imageInfo.alt_description}</h5>
            <p className="card-text">
            {props.imageInfo.id}
             {props.imageInfo.description}
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </>
      
    </div>
  );
}
