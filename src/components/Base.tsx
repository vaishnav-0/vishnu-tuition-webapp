import React from "react";
import './base.css';

export default function Base() {
    return (
        <div>
            <div className="menu-bar">
                <h1 className="logo"></h1>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li>
                        <a href="#">Class <i className="fas fa-caret-down"></i></a>
                        <div className="dropdown-menu">
                            <ul>
                                <li><a href="#">MODULE 1</a></li>
                                <li><a href="#">MODULE 2</a></li>
                                <li><a href="#">MODULE 3</a></li>
                                <li><a href="#">MODULE 4</a></li>
                                <li>
                                    <a href="#">Notes <i className="fas fa-caret-right"></i></a>
                                    <div className="dropdown-menu-1">
                                        <ul>
                                            <li><a href="#">MOD-1</a></li>
                                            <li><a href="#">MOD-2</a></li>
                                            <li><a href="#">MOD-3</a></li>
                                            <li><a href="#">MOD-4</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="#">Contact us</a></li>
                </ul>
            </div>
            <div className="content">
                <h1>Computer Programming Course</h1>
                <button className="cn"><a href="#">JOIN US</a></button>
            </div>
        </div>
    );

}