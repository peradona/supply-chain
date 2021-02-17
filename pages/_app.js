import React from 'react'
import App from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { Router } from '../routes';


export default class MyApp extends App {

  state = {
    navigate: false
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  constructor(props) {
    super(props);
    Router.events.on('routeChangeStart', this.handleRouteChange);
    Router.events.on('routeChangeComplete', this.handleRouteComplete);
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      window.ethereum.on('networkChanged', function (accounts) {
        Router.pushRoute(`/`);
      });
    }
  }

  handleRouteChange = () => {
    this.setState({ navigate: true });
  };

  handleRouteComplete = () => {
    this.setState({ navigate: false });
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
        <div>
          <Head>
            <link href="https://fonts.googleapis.com/css?family=Mitr&display=swap" rel="stylesheet" />
          </Head>
          <main className="heavy-rain-gradient">
            {/*<style global jsx>{`*/}
            {/*      body {*/}
            {/*        // font-family: 'Kanit', sans-serif;*/}
            {/*        font-family: 'Mitr', sans-serif;*/}
            {/*      }*/}
            {/*    `}</style>*/}
              <Component {...pageProps} />
          </main>
          {/*<LoadingModal open={this.state.navigate}/>*/}
        </div>
    )
  }
}