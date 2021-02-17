import React, {Component} from 'react';
import { Button, Container, Modal} from 'react-bootstrap';
import "./index.css";
import web3 from '../ethereum/web3';
import PublishModal from "../components/Modal/PublishModal";
import EPCDetailsCard from "../components/Card/EPCDetailsCard";

import SupplyChain from '../ethereum/SupplyChain';

class Index extends Component {
    state = {
        accounts: null,
        balance: 0,
        publishModalShow: false,
        publishEvents: [],
        showSearch: false,
        EPCCode: ''
    }

    static async getInitialProps() {

    }

    togglePublish = () => {
        this.setState({ publishModalShow: !this.state.publishModalShow });
    }

    handleClose = () => this.setState({ showSearch: false });
    handleShow = () => this.setState({ showSearch : true });

    componentDidMount() {
        try {
            web3.eth.getAccounts().then(accounts => {
                this.setState({accounts});
                try {
                    web3.eth.getBalance(accounts[0], (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            this.setState({balance: web3.utils.fromWei(result, "ether")})
                        }
                    })
                } catch (e) {
                    console.log(e);
                }
            });
            SupplyChain.getPastEvents("Publish",
                {
                    fromBlock: 0,
                    toBlock: 'latest' // You can also specify 'latest'
                }).then((events) => {
                    let publishEvents = [];
                    for (let e of events) {
                        let supplyData = JSON.parse(e.returnValues.supplyJSON);
                        publishEvents.push(supplyData)
                        console.log(supplyData);
                    }
                    this.setState({publishEvents});
                }).catch((err) => console.error(err));
        } catch (e) {
            console.log(e);
        }
    }

    renderEPCDetailsCard = () => {
        return this.state.publishEvents.map((events, index) => {
            return (
                <EPCDetailsCard
                    key={index}
                    EPC={events}
                    // EPCCode={events.EPCCode}
                    // GLNOrigin={events.GLNOrigin}
                />
            )
        });
    }

    allEvents = () => {
        SupplyChain.getPastEvents("Publish",
            {
                fromBlock: 0,
                toBlock: 'latest' // You can also specify 'latest'
            }).then((events) => {
            let publishEvents = [];
            for (let e of events) {
                let supplyData = JSON.parse(e.returnValues.supplyJSON);
                publishEvents.push(supplyData)
                console.log(supplyData);
            }
            this.setState({publishEvents});
        }).catch((err) => console.error(err));
    }

    search = () => {
        console.log("search");
        // console.log("EPC Code,", this.state.EPCCode.length);
        SupplyChain.getPastEvents("Publish",
            {
                filter: {EPCCode: this.state.EPCCode},
                fromBlock: 0,
                toBlock: 'latest' // You can also specify 'latest'
            }).then((events) => {
            let publishEvents = [];
            for (let e of events) {
                let supplyData = JSON.parse(e.returnValues.supplyJSON);
                publishEvents.push(supplyData)
                console.log(supplyData);
            }
            this.setState({publishEvents});
        }).catch((err) => console.error(err));
    }

    searching = () => {
        console.log("searching")
        SupplyChain.getPastEvents("Publish",
            {
                fromBlock: 0,
                toBlock: 'latest'
            }).then((events) => {
            let publishEvents = [];
            for (let e of events) {
                let supplyData = JSON.parse(e.returnValues.supplyJSON);
                publishEvents.push(supplyData)
            }
            let newPublishEvents = publishEvents.filter((event) => {
                return event.EPCCode === this.state.EPCCode;
            });
            this.setState({EPCCode: '', publishEvents : newPublishEvents});
            this.handleClose();
        }).catch((err) => console.error(err));

    }

    render() {
        return (
            <Container>
                <div className={`head d-flex justify-content-center align-items-center bg-dark text-white mb-3 rounded`}>
                    <h1>
                        Supply Chain Traceability
                    </h1>
                </div>
                <div className="p-3 border rounded d-flex justify-content-between mb-3">
                    <div>
                        <span>Address:</span> <span className="text-secondary">{this.state.accounts}</span>
                    </div>
                    <div>
                        Balance: <span className="text-secondary">{this.state.balance}</span> ETH
                    </div>
                </div>
                <div className="p-3 border rounded d-flex justify-content-start bg-light mb-3">
                    <Button className="mr-auto" onClick={this.allEvents}>Events</Button>
                    <Button className="mr-3" onClick={this.handleShow}>Searching EPC</Button>
                    <Button onClick={this.togglePublish}>Published Products</Button>
                </div>
                {this.renderEPCDetailsCard()}
                <PublishModal
                    show={this.state.publishModalShow}
                    onHide={this.togglePublish}
                />
                <Modal show={this.state.showSearch} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Search</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="d-block">
                            <strong>EPC Code</strong>
                        </label>
                        <input className="w-100" name="" type="text" value={this.state.EPCCode} onChange={(event) => {this.setState({ EPCCode: event.target.value })}} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.searching}>
                            Search
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}

export default Index;