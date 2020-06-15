import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

let store = configureStore();
import configureStore from './redux/configureStore';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);
