import React, { Component } from 'react';
import { Button } from "react-bootstrap";

class EPCDetailsCard extends Component {
    render() {
        let { EPC } = this.props;
        return (
            <div className="rounded border mb-3">
                <div className="bg-light p-3 border-bottom">
                    EPC Code: {EPC.EPCCode}
                </div>
                <div className="p-3 d-flex flex-column">
                    <label><strong>GLN Origin:</strong> {EPC.GLNOrigin}</label>
                    <label><strong>EPIS URL:</strong> <a href={EPC.EPISURL}>{EPC.EPISURL}</a></label>
                    <label><strong>State:</strong> {EPC.state}</label>
                    <label><strong>GLN Destination:</strong> {EPC.GLNDestination}</label>
                    <label><strong>Event:</strong> {EPC.event}</label>
                    <label><strong>Date time:</strong> {EPC.datetime}</label>
                    <label><strong>User account:</strong> {EPC.userAccount}</label>
                    <label><strong>Total time:</strong> {EPC.totalTime}</label>
                    <label><strong>Start date:</strong> {EPC.startDate}</label>
                    <label><strong>Finish date:</strong> {EPC.finishDate}</label>
                    <label><strong>Quantity:</strong> {EPC.quantity}</label>
                    <label><strong>Unit:</strong> {EPC.unit}</label>
                    <label><strong>Document ID:</strong> {EPC.documentID}</label>
                </div>
                <div className="bg-light p-3 border-top">
                    <Button className="mr-3">Detail EPCIS events</Button>
                    <Button>Event Watch</Button>
                </div>
            </div>
        )
    }
}

export default EPCDetailsCard;