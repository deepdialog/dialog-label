import * as React from 'react'
// import { Link, Redirect } from 'react-router-dom'
import * as _ from 'lodash'
import {Row, Col, Form, Input, Button, message, Table} from 'antd'
const { Item } = Form
import {setNLG, getNLG} from '../utils/nlg'

export default class NLG extends React.Component {

    state = {
        redirect: null,
        newSysAct : '',
        newResponse:'',
        nlg: getNLG(),
    }

    constructor (props) {
        super(props)
    }

    onSubmit = e => {
        if (e && e.preventDefault) {
            e.preventDefault()
        }
        const {newSysAct, newResponse, nlg} = this.state
        if (newSysAct.trim().length <= 0) {
            return message.warning('Sys Act 不能为空')
        }
        if (newResponse.trim().length <= 0) {
            return message.warning('Response 不能为空')
        }
        for (const item of nlg) {
            if (item.sysact.replace(/\s|\(|\)/g, '') === newSysAct.replace(/\s|\(|\)/g, '')) {
                return message.warning('不能存在相同 System Action')
            }
        }
        const newNLG = [{sysact: newSysAct, response: newResponse}].concat(nlg)
        this.setState({
            nlg: newNLG,
            newSysAct: '',
            newResponse: '',
        })
        setNLG(newNLG)
    }

    render () {
        const {newSysAct, newResponse} = this.state
        return (
            <div>
                <Row>
                    <Col>
                        <Form
                            onSubmit={this.onSubmit}
                        >
                            <Item
                                label='SysAct'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Input
                                    value={newSysAct}
                                    onChange={e => this.setState({newSysAct: e.target.value})}
                                    suffix={
                                        <Button
                                            style={{cursor: 'pointer', border: 0, height: '24px'}}
                                            icon='close-circle'
                                            onClick={() => this.setState({ newSysAct: '' })}
                                            disabled={newSysAct.length <= 0}
                                        />
                                    }
                                    onKeyUp={e => {
                                        if (e.keyCode === 27) {
                                            this.setState({ newSysAct: '' })
                                        } else if (e.keyCode === 13) {
                                            this.onSubmit(null)
                                        }
                                    }}
                                    placeholder='要新建NLG请 输入一个 System Act，如：hello(name)'
                                />
                            </Item>
                            <Item
                                label='Resp'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Input
                                    value={newResponse}
                                    onChange={e => this.setState({newResponse: e.target.value})}
                                    suffix={
                                        <Button
                                            style={{cursor: 'pointer', border: 0, height: '24px'}}
                                            icon='close-circle'
                                            onClick={() => this.setState({ newResponse: '' })}
                                            disabled={newResponse.length <= 0}
                                        />
                                    }
                                    onKeyUp={e => {
                                        if (e.keyCode === 27) {
                                            this.setState({ newResponse: '' })
                                        } else if (e.keyCode === 13) {
                                            this.onSubmit(null)
                                        }
                                    }}
                                    placeholder='和一个 Response Template 并 回车，如：{name}你好，见到你很高兴'
                                />
                            </Item>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col offset={3} span={18}>
                        {this.table()}
                    </Col>
                </Row>
            </div>
        )
    }

    table() {
        const Columns = [
            {
                key: 'sysact',
                dataIndex: 'sysact',
                title: 'System Action',
            },
            {
                key: 'response',
                dataIndex: 'response',
                title: 'Response',
            },
            {
                key: 'manage',
                dataIndex: 'manage',
                title: '管理',
            },
        ]
        const {nlg} = this.state
        return (
            <Table
                pagination={{ defaultPageSize: 100 }}
                columns={Columns}
                dataSource={nlg.map(item => {
                    return {
                        key: item.sysact,
                        sysact: item.sysact,
                        response: item.response,
                        manage: (
                            <Button
                                onClick={() => {
                                    const newNLG = nlg.filter(i => i.sysact !== item.sysact)
                                    this.setState({nlg: newNLG})
                                }}
                                title='删除这条记录'
                            >
                                删除
                            </Button>
                        )
                    }
                })}
            />
        )
    }
    
}