import React from "react";

export default class Message extends React.Component {
   render(){
    const {message} = this.props;
    return (
        <div className="card mb3- mt-3 shadow-sm">
            <div className="card-body">
                <div className="card-text">
                    {message}
                </div>
            </div>
        </div>
    );
   } 
};