import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.js';
import TargetHtmlElementId from './src/library/stringLiterals/TargetHtmlElementId.js';

import t from './src/library/stringLiterals/TargetHtmlElementId.js';


const root = ReactDOM.createRoot(document.getElementById(TargetHtmlElementId.ROOT));

root.render(<App />);