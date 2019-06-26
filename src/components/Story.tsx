import * as React from 'react'
// import { Link, Redirect } from 'react-router-dom'
import * as _ from 'lodash'
import {Row, Col, Form, Input, Button, message, Card} from 'antd'
const { Item } = Form
import {getStories, setStories} from '../utils/stories'


export default class Story extends React.Component {

    state = {
        redirect: null,
        newSubject: '',
        modified: null,
        newTurn: '',
    }

    constructor (props) {
        super(props)
    }

    onNewSubject = (e: any) => {
        if (e && e.preventDefalut) {
            e.preventDefault()
        }
        const stories = getStories()
        const {newSubject} = this.state
        if (stories.hasOwnProperty(newSubject)) {
            message.warn('Subject exists')
        } else {
            stories[newSubject] = []
            setStories(stories)
            console.log('newSubject', newSubject)
            this.setState({
                newSubject: '',
            })
        }
    }

    onNewTurn = (subj) => {
        const stories = getStories()
        let {newTurn} = this.state
        newTurn = newTurn.trim()
        if (stories.hasOwnProperty(subj)) {
            if (newTurn.match(/^user:/i)) {
                const value = newTurn.substring(5).trim()
                if (!value) {
                    return message.warn('Not content')
                }
                stories[subj].push({
                    user: value
                })
                setStories(stories)
                this.setState({
                    newTurn: '',
                })
            } else if (newTurn.match(/^sys:/i)) {
                const value = newTurn.substring(4).trim()
                if (!value) {
                    return message.warn('Not content')
                }
                stories[subj].push({
                    sys: value
                })
                setStories(stories)
                this.setState({
                    newTurn: '',
                })
            } else {
                message.warn('Invalid dialog, need startswith user: or sys:')
            }
        } else {
            message.warn('Subject dosen\'t exist')
        }
    }

    render () {
        const {newSubject, newTurn} = this.state
        const stories = getStories()
        return (
            <div>
                <Row>
                    <Col offset={3} span={18}>
                        <h2>STORY</h2>
                    </Col>
                </Row>
                <Row>
                    <Col offset={3} span={18}>
                        <form onSubmit={e => this.onNewSubject(e)}>
                            <Input
                                value={newSubject}
                                onChange={e => this.setState({newSubject: e.target.value})}
                                suffix={
                                    <Button
                                        style={{cursor: 'pointer', border: 0, height: '24px'}}
                                        icon='close-circle'
                                        onClick={() => this.setState({ newSubject: '' })}
                                        disabled={newSubject.length <= 0}
                                    />
                                }
                                onKeyUp={e => {
                                    if (e.keyCode === 27) {
                                        this.setState({newSubject: ''})
                                    }
                                }}
                                placeholder='输入对话标题并回车新建'
                            />
                        </form>
                    </Col>
                </Row>
                <Row>
                    {Object.keys(stories).map((subj: string) => (
                        <Col offset={3} span={18} key={subj}>
                            <Card
                                style={{
                                    marginTop: '10px',
                                }}
                                title={
                                    <div>
                                        <Button
                                            style={{cursor: 'pointer', border: 0, height: '24px'}}
                                            icon='close-circle'
                                            onClick={() => {
                                                let stories = getStories()
                                                delete stories[subj]
                                                setStories(stories)
                                                this.setState({modified: new Date()})
                                            }}
                                        />
                                        <label>{subj}</label>
                                    </div>
                                }
                            >
                                <div>
                                    {stories[subj].map((item: string, index: number) => (
                                        <div key={index}>
                                            {(() => {
                                                if (item.hasOwnProperty('user')) {
                                                    return (
                                                        <p>
                                                            <Button
                                                                style={{cursor: 'pointer', border: 0, height: '24px'}}
                                                                icon='close-circle'
                                                                onClick={() => {
                                                                    let stories = getStories()
                                                                    stories[subj] = stories[subj].slice(0, index)
                                                                    setStories(stories)
                                                                    this.setState({modified: new Date()})
                                                                }}
                                                            />
                                                            <label style={{marginRight: '20px'}}>USER:</label>
                                                            <span>{item['user']}</span>
                                                        </p>
                                                    )
                                                } else if (item.hasOwnProperty('sys')) {
                                                    return (
                                                        <p>
                                                            <Button
                                                                style={{cursor: 'pointer', border: 0, height: '24px'}}
                                                                icon='close-circle'
                                                                onClick={() => {
                                                                    let stories = getStories()
                                                                    stories[subj] = stories[subj].slice(0, index)
                                                                    setStories(stories)
                                                                    this.setState({modified: new Date()})
                                                                }}
                                                            />
                                                            <label style={{marginRight: '20px'}}>SYS:</label>
                                                            <span>{item['sys']}</span>
                                                        </p>
                                                    )
                                                }
                                            })()}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <form onSubmit={(e: any) => {
                                        if (e && e.preventDefalut) {
                                            e.preventDefalut()
                                        }
                                        this.onNewTurn(subj)
                                    }}>
                                        <Input
                                            value={newTurn}
                                            onChange={e => this.setState({newTurn: e.target.value})}
                                            suffix={
                                                <Button
                                                    style={{cursor: 'pointer', border: 0, height: '24px'}}
                                                    icon='close-circle'
                                                    onClick={() => this.setState({ newTurn: '' })}
                                                    disabled={newTurn.length <= 0}
                                                />
                                            }
                                            onKeyUp={e => {
                                                if (e.keyCode === 27) {
                                                    this.setState({newTurn: ''})
                                                }
                                            }}
                                            placeholder='输入新对话并回车新建'
                                        />
                                    </form>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }

}
