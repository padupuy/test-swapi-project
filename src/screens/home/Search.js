import React from 'react';

import './Search.css';

export default function Search() {
  return (
    <div className="Search">
      <form>
        <div className="Search__Content">
          <h2 className="h6-like">
            To find the answers to your question, this form you should use
          </h2>
          <input
            type="search"
            id="search"
            name="search"
            defaultValue="search"
            className="Search__Input"
          />
        </div>
        <div className="Search__Footer">
          <div className="Search__Options">
            <div>
              <input
                type="radio"
                id="vehicle"
                name="vehicle"
                value="vehicle"
                defaultChecked
              />
              <label>Vehicle</label>
            </div>
            <div>
              <input
                type="radio"
                id="character"
                name="character"
                value="character"
              />
              <label>Character</label>
            </div>
          </div>
          <button type="submit" className="Search__Button">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
