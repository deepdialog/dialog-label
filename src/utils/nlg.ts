
import * as _ from 'lodash'

export function getNLG () {
    const nlg = localStorage.getItem('nlg')
    if (!_.isString(nlg)) {
        return []
    } else {
        try {
            const t = JSON.parse(nlg)
            return t
        } catch (e) {
            return []
        }
    }
}

export function setNLG (nlg: any[]) {
    localStorage.setItem('nlg', JSON.stringify(nlg))
}
