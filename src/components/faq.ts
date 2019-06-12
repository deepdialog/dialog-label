
export function getFAQ () {
    let faq = localStorage.getItem('faq')
    if (typeof faq !== 'string') {
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
