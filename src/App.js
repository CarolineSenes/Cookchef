import React, { Component } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from './App.module.scss';

export default class App extends Component {
  render() {
    return (
      <div className={`d-flex flex-column ${styles.appContainer}`}>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}
