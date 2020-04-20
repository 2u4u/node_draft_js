import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Add from "../components/Add";
import View from "../components/View";
import { Layout, Menu } from 'antd';
import { PlusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Router>
        <Header>
          <Menu
            mode="horizontal"
            theme="dark">
            <Menu.Item key="add">
              <PlusCircleOutlined />
              <Link to="add">Add</Link>
            </Menu.Item>
            <Menu.Item key="view">
              <EyeOutlined />
              <Link to="view">View</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px' }}>
          <Switch>
            <Route exact path="/add" component={Add} />
            <Route exact path="/view" component={View} />
            <Route exact path="/edit" component={Add} />
            <Route path="/" component={App} />
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
