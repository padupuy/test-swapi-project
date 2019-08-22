import React from 'react';
import { Link } from 'react-router-dom';

import './Characters.css';

export default function Characters() {
  return (
    <React.Fragment>
      <div className="Characters">
        <header className="Characters__Header">
          <h2>Characters</h2>
          <Link to="/characters" title="See all characters">
            See all characters
          </Link>
        </header>
        <div className="Characters__List">
          <div className="Characters__List__Item">Char 1</div>
          <div className="Characters__List__Item">Char 2</div>
          <div className="Characters__List__Item">Char 3</div>
        </div>
      </div>
      <div className="Characters">
        <header className="Characters__Header">
          <h2>Vehicles</h2>
          <Link to="/vehicles" title="See all characters">
            See all vehicles
          </Link>
        </header>
        <div className="Characters__List Characters__List--inverted">
          <div className="Characters__List__Item">Vehicle 1</div>
          <div className="Characters__List__Item">Vehicle 2</div>
          <div className="Characters__List__Item">Vehicle 3</div>
        </div>
      </div>
    </React.Fragment>
  );
}
