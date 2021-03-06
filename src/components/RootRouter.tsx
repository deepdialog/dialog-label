import * as React from 'react'
import { Route, HashRouter as Router, Redirect } from 'react-router-dom'
import { Row, Col, Menu, Button, Icon, Popconfirm } from 'antd'
const { Item } = Menu
import 'antd/dist/antd.css'
import * as yaml from 'js-yaml'
import { saveAs } from 'file-saver'

import { getSentences } from '../utils/sentences'
import { getEntities } from '../utils/entities'
import { getNLG } from '../utils/nlg'
import { getFAQ } from '../utils/faq'
import { getStories } from '../utils/stories'

import Label from './Label'
import Home from './Home'
import LabelList from './LabelList'
import SlotList from './SlotList'
import Slot from './Slot'
import NLG from './NLG'
import FAQ from './FAQ'
import Story from './Story'
import {loadAlert} from '../utils/loadAlert'

export default class RootRouter extends React.Component {

    state = {
        redirect: null,
        currentMenu: null,
    }

    constructor(props) {
        super(props)
        document.title = 'Deep Dialog Label'

        loadAlert()
    }

    handleClick = (e) => {
        this.setState({
            redirect: e.key,
            currentMenu: e.key,
        })
    }

    componentDidMount () {
        const menus = [
            [/\/labels/, '/labels'],
            [/\/slots/, '/slots'],
            [/\/nlg/, '/nlg'],
            [/\/faq/, '/faq'],
            [/\/story/, '/story'],
        ]
        for (const m of menus) {
            if (document.URL.match(m[0])) {
                this.setState({
                    currentMenu: m[1]
                })
                return
            }
        }
        this.setState({
            currentMenu: '/'
        })
    }

    componentDidUpdate () {
        if (this.state.redirect) {
            this.setState({
                redirect: null
            })
        }
    }

    exportClick = () => {
        const data = {
            nlu: getSentences().concat(getEntities()),
            story: getStories(),
            nlg: getNLG(),
            faq: getFAQ(),
        }
        console.log('dump data', data)
        const dump = yaml.safeDump(data)
        // console.log(dump)
        const getDate = () => {
            const t = new Date()
            t.setMinutes(t.getMinutes() - t.getTimezoneOffset())
            return t.toJSON().substring(0, 16).replace(/T|:|-/g, '')
        }
        const file = new File(
            [dump],
            `dialog_data_${getDate()}.yml`,
            {
                type: 'text/plaincharset=utf-8',
            }
        )
        saveAs(file)
    }

    deleteAll = e => {
        // localStorage.removeItem('sentences')
        // localStorage.removeItem('entities')
        localStorage.clear()
        this.setState({
            redirect: '/'
        })
    }

    render() {
        const { redirect, currentMenu } = this.state
        let selectedKeys = []
        if (currentMenu) {
            selectedKeys = [currentMenu]
        }
        return (
            <Router>
                <div>
                    {redirect ? <Redirect to={ redirect } /> : null}
                    <header style={{ marginBottom: '10px' }}>
                        <Row>
                            <Col span={18} offset={3}>

                                <Button
                                    style={{
                                        float: 'right',
                                        marginTop: '7px',
                                    }}
                                    onClick={this.exportClick}
                                >
                                    <Icon type='download' />
                                    导出
                                </Button>

                                <Popconfirm
                                    title='危险操作！会清空所有浏览器保存的内容！'
                                    onConfirm={this.deleteAll}
                                >
                                    <Button
                                        style={{
                                            float: 'right',
                                            marginTop: '7px',
                                            marginRight: '20px',
                                        }}
                                    >
                                        <Icon type='delete' />
                                        清空
                                    </Button>
                                </Popconfirm>
                                
                                <Menu
                                    selectedKeys={selectedKeys}
                                    mode='horizontal'
                                    onClick={this.handleClick}
                                    style={{
                                        fontSize: '20px'
                                    }}
                                >
                                    <Item
                                        key='logo'
                                        style={{
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            marginRight: '10px',
                                        }}
                                        disabled
                                    >
                                        DeepDL
                                    </Item>
                                    <Item key='/'>
                                        Import
                                    </Item>
                                    <Item key='/labels'>
                                        Intent
                                    </Item>
                                    <Item key='/slots'>
                                        Entity
                                    </Item>
                                    <Item key='/nlg'>
                                        NLG
                                    </Item>
                                    <Item key='/faq'>
                                        FAQ
                                    </Item>
                                    <Item key='/story'>
                                        STORY
                                    </Item>
                                </Menu>
                            </Col>
                        </Row>
                    </header>
                    <Route path='/' exact component={Home} />
                    <Route path='/label/:label' exact component={Label} />
                    <Route path='/label/:filter/:label' exact component={Label} />
                    <Route path='/labels' exact component={LabelList} />
                    <Route path='/labels/:text' exact component={LabelList} />
                    <Route path='/slots' exact component={SlotList} />
                    <Route path='/slot/:entity' exact component={Slot} />
                    <Route path='/nlg' exact component={NLG} />
                    <Route path='/faq' exact component={FAQ} />
                    <Route path='/story' exact component={Story} />
                    <Route path='/story/:name' exact component={Story} />
                </div>
            </Router>
        )
    }
}
