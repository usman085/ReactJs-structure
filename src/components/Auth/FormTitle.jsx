import React from 'react'
import './style.css';
export default function FormTitle(props) {
    return (
        <React.Fragment>
            <div className="title">
                <div className="title__content">
                    <h2>{props.title}</h2>
                </div>
            </div>
        </React.Fragment>
    );
}
