import * as React from 'react'
// import { Link, Redirect } from 'react-router-dom'
import * as _ from 'lodash'
import {Row, Col, Form, Input, Button, message, Table} from 'antd'
const { Item } = Form

export default class Story extends React.Component {

    state = {
        redirect: null,
    }

    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div>
                <Row>
                    <Col offset={3} span={18}>
                        <h2>STORY</h2>
                    </Col>
                </Row>
            </div>
        )
    }

}