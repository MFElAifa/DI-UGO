import React from "react";

export default class Spinner extends React.Component {
   render(){
    return (
        <div className="card mb3- mt-3 shadow-sm">
            <div className="card-body">
                <i className="fas fa-spinner fa-spin"/>
            </div>
        </div>
    );
   } 
};