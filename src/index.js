import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
//渲染App组件，然后跟root里原来的DOM进行水合
hydrateRoot(root, <App />);