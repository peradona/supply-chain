import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Web3 from 'web3';
import SupplyChain from '../../ethereum/SupplyChain';
import Router from "next/router";

class PublishModal extends Component {

    state = {
        EPCCode: '',
        GLNOrigin: '',
        EPISURL: '',
        state: '',
        GLNDestination: '',
        event: 'ADD',
        datetime: '',
        userAccount: '',
        totalTime: '',
        startDate: '',
        finishDate: '',
        quantity: '',
        unit: '',
        documentID: ''
    }

    publish = (e) => {
        console.log("Submit: ", e);
    }

    handleChangeEvent = (event) => {
        console.log("Event", event.currentTarget.value);
        this.setState({ event: event.currentTarget.value }) // I tried before target.value, or nativeEvent.value
    }


    // handleChange = (event) => {
    //     console.log(event.target.value);
    //     JS
    //     // this.setState({value: event.target.value});
    // }

    handleSubmit = async (event) => {
        let supplyJSON = JSON.stringify(this.state);
        console.log("Supply JSON: ", supplyJSON);
        event.preventDefault();

        let web3;
        let netId;

        if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
            web3 = new Web3(window.web3.currentProvider);
            netId = await web3.eth.net.getId();
            console.log('Provider is metamask');
        }

        try {
            await window.web3.currentProvider.enable();
            const accounts = await web3.eth.getAccounts();

            await SupplyChain.methods.publish(
                this.state.EPCCode,
                supplyJSON
            ).send({
                from: accounts[0]
            }).then(res => {
                console.log(res);
                this.props.onHide();
                Router.push('/');
            });

        } catch (err) {
            console.log(err);
            this.setState({ loading: false });
            this.setState( { errorMessage : err.message });
        }
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Publish your product information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-5">
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>EPC Code</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.EPCCode} onChange={(event) => {this.setState({EPCCode: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>GLN Origin</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.GLNOrigin} onChange={(event) => {this.setState({GLNOrigin: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>EPIS URL</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.EPISURL} onChange={(event) => {this.setState({EPISURL: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>State</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.state} onChange={(event) => {this.setState({state: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>GLN Destination</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.GLNDestination} onChange={(event) => {this.setState({GLNDestination: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">

                            <label className="d-block">
                                <strong>Event</strong>
                            </label>
                            <select onChange={this.handleChangeEvent}
                                    value={this.state.event}
                                    defaultValue={this.state.event}>
                                <option value="ADD">ADD</option>
                                <option value="OBSERVE">OBSERVE</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                            {/*<input className="w-100" name="" type="text" value={this.state.event} onChange={(event) => {this.setState({event: event.target.value})}} />*/}
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>Date time</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.datetime} onChange={(event) => {this.setState({datetime: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>User Account</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.userAccount} onChange={(event) => {this.setState({userAccount: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>Total time</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.totalTime} onChange={(event) => {this.setState({totalTime: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>Start date</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.startDate} onChange={(event) => {this.setState({startDate: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>Finish date</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.finishDate} onChange={(event) => {this.setState({finishDate: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>Quantity</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.quantity} onChange={(event) => {this.setState({quantity: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>Unit</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.unit} onChange={(event) => {this.setState({unit: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="mb-2">
                            <label className="d-block">
                                <strong>Document ID</strong>
                            </label>
                            <input className="w-100" name="" type="text" value={this.state.documentID} onChange={(event) => {this.setState({documentID: event.target.value})}} />
                            <br/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button variant="success" type="submit">Publish</Button>
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default PublishModal;