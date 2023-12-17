import React, { Fragment } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { Big, Comment, Issues, Medium, Resolved, Small } from '../../../../Constant';

const IssueClass = ({ register }) => {
    return (
        <Fragment>
            <Row>
                <Col>
                    <FormGroup>
                        <Label>{Issues}</Label>
                        <Input type="select" name="issues" placeholder="Select Issues" className="form-control digits" required>
                            <option>{Small}</option>
                            <option>{Medium}</option>
                            <option>{Big}</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
        </Fragment>
    );
};

export default IssueClass;