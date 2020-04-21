import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//our components
import Add from "../components/Add";
import View from "../components/View";
//ant part
import { Layout, Menu } from 'antd';
import { PlusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Router>
        <Header>
          {/* top menu */}
          <Menu
            mode="horizontal"
            theme="dark">
            <Menu.Item key="add">
              <PlusCircleOutlined />
              {/* links to pages */}
              <Link to="add">Add</Link>
            </Menu.Item>
            <Menu.Item key="view">
              <EyeOutlined />
              <Link to="view">View</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px' }}>
          {/* application routing */}
          <Switch>
            <Route exact path="/add" component={Add} />
            <Route exact path="/view" component={View} />
            <Route exact path="/edit" component={Add} />
            <Route path="/" component={View} />
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
