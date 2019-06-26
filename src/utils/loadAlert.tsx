
import {message} from 'antd'
import {getEntities, setEntities} from './entities'
import {getNLG} from './nlg'
import {getSentences, setSentences} from './sentences'
import {getStories} from './stories'
import {getFAQ} from './faq'

/**
 * 检测保存的数据并提示
 */
export function loadAlert() {

    const msgs = []
        
    if (getEntities().length <= 0) {
        setEntities(EntitiesSample)
        // msgs.push('当前没有 实体 语料')
    } else {
        msgs.push(`${getEntities().length}条 实体样例`)
    }

    if (getNLG().length <= 0) {
        // setEntities(EntitiesSample)
        // msgs.push('当前没有 实体 语料，已经载入默认实体样例')
    } else {
        msgs.push(`${getNLG().length}条 对话生成`)
    }

    if (getSentences().length <= 0) {
        setSentences(SentencesSample)
        // msgs.push('当前没有 意图 语料')
    } else {
        msgs.push(`${getSentences().length}条 意图样例`)
    }

    if (Object.keys(getStories()).length <= 0) {
        // setEntities(EntitiesSample)
        // msgs.push('当前没有 实体 语料，已经载入默认实体样例')
    } else {
        msgs.push(`${Object.keys(getStories()).length}条 对话`)
    }


    if (getFAQ().length <= 0) {
        // setEntities(EntitiesSample)
        // msgs.push('当前没有 实体 语料，已经载入默认实体样例')
    } else {
        msgs.push(`${getFAQ().length}条 问答对`)
    }

    console.log('load alert', msgs.join('\n'))
    if (msgs.length) {
        message.info(`载入了 ${msgs.join('\n')}`)
    } else {
        message.info('系统没有数据，初始化')
    }
}


const EntitiesSample = [
    {
        'entity': 'city',
        'data': [
            '上海市',
            ['西安市', '西安'],
            ['北京', '首都', '北京市'],
        ]
    }
]

const SentencesSample = [
    {
        'domain': 'flight',
        'intent': 'orderTicket',
        'data': [
            {
                'text': '我要'
            },
            {
                'text': '北京',
                'name': 'departCity',
                'start': 2,
                'end': 4,
            },
            {
                'text': '到'
            },
            {
                'text': '上海',
                'name': 'arriveCity',
                'start': 5,
                'end': 7,
            },
            {
                'text': '的机票'
            },
        ]
    }
]
