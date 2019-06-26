import * as React from 'react'
// import { Link, Redirect } from 'react-router-dom'
import * as _ from 'lodash'
import {Row, Col, Form, Input, Button, message, Table} from 'antd'
const { Item } = Form
import {setFAQ, getFAQ} from '../utils/faq'

export default class FAQ extends React.Component {

    state = {
        redirect: null,
        newQuestion : '',
        newAnswer:'',
        faq: getFAQ(),
    }

    constructor (props) {
        super(props)
    }

    onSubmit = e => {
        if (e && e.preventDefault) {
            e.preventDefault()
        }
        const {newQuestion, newAnswer, faq} = this.state
        if (newQuestion.trim().length <= 0) {
            return message.warning('问题 不能为空')
        }
        if (newAnswer.trim().length <= 0) {
            return message.warning('答案 不能为空')
        }
        for (const item of faq) {
            if (item.question.replace(/\s|\(|\)/g, '') === newQuestion.replace(/\s|\(|\)/g, '')) {
                return message.warning('不能存在相同 问题')
            }
        }
        const newFAQ = [{question: newQuestion, answer: newAnswer}].concat(faq)
        this.setState({
            faq: newFAQ,
            newQuestion: '',
            newAnswer: '',
        })
        setFAQ(newFAQ)
    }

    render () {
        const {newQuestion, newAnswer} = this.state
        return (
            <div>
                <Row>
                    <Col>
                        <Form
                            onSubmit={this.onSubmit}
                        >
                            <Item
                                label='Question'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Input
                                    value={newQuestion}
                                    onChange={e => this.setState({newQuestion: e.target.value})}
                                    suffix={
                                        <Button
                                            style={{cursor: 'pointer', border: 0, height: '24px'}}
                                            icon='close-circle'
                                            onClick={() => this.setState({ newQuestion: '' })}
                                            disabled={newQuestion.length <= 0}
                                        />
                                    }
                                    onKeyUp={e => {
                                        if (e.keyCode === 27) {
                                            this.setState({ newQuestion: '' })
                                        } else if (e.keyCode === 13) {
                                            this.onSubmit(null)
                                        }
                                    }}
                                    placeholder='要新建FAQ请 输入一个 问题，如：你支持多论对话吗？'
                                />
                            </Item>
                            <Item
                                label='Answer'
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Input
                                    value={newAnswer}
                                    onChange={e => this.setState({newAnswer: e.target.value})}
                                    suffix={
                                        <Button
                                            style={{cursor: 'pointer', border: 0, height: '24px'}}
                                            icon='close-circle'
                                            onClick={() => this.setState({ newAnswer: '' })}
                                            disabled={newAnswer.length <= 0}
                                        />
                                    }
                                    onKeyUp={e => {
                                        if (e.keyCode === 27) {
                                            this.setState({ newAnswer: '' })
                                        } else if (e.keyCode === 13) {
                                            this.onSubmit(null)
                                        }
                                    }}
                                    placeholder='和一个 答案 并 回车，如：我支持呀'
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
                key: 'question',
                dataIndex: 'question',
                title: 'Question',
            },
            {
                key: 'answer',
                dataIndex: 'answer',
                title: 'Answer',
            },
            {
                key: 'manage',
                dataIndex: 'manage',
                title: '管理',
            },
        ]
        const {faq} = this.state
        return (
            <Table
                pagination={{ defaultPageSize: 100 }}
                columns={Columns}
                dataSource={faq.map(item => {
                    return {
                        key: item.question,
                        question: item.question,
                        answer: item.answer,
                        manage: (
                            <Button
                                onClick={() => {
                                    const newFAQ = faq.filter(i => i.question !== item.question)
                                    this.setState({faq: newFAQ})
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