import React from 'react';
import UserList from '../containers/user-list';
require('../../scss/style.scss');
import '@shopify/polaris/styles.css';

const App = () => (
    <div>
        <UserList />
    </div>
);

export default App;
