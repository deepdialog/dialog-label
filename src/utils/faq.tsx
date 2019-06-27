
import * as _ from 'lodash'
import {message} from 'antd'

export function getFAQ () {
    const faq = localStorage.getItem('faq')
    if (!_.isString(faq)) {
        return []
    } else {
        try {
            const t = JSON.parse(faq)
            return t
        } catch (e) {
            return []
        }
    }
}

export function setFAQ (faq: any[]) {
    localStorage.setItem('faq', JSON.stringify(faq))
}
