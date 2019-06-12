
export function getNLG () {
    let nlg = localStorage.getItem('nlg')
    if (typeof nlg !== 'string') {
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
