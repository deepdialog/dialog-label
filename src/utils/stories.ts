
import * as _ from 'lodash'

export function getStories () {
    const stories = localStorage.getItem('story')
    if (!_.isString(stories)) {
        return {}
    } else {
        try {
            const t = JSON.parse(stories)
            return t
        } catch (e) {
            return {}
        }
    }
}

export function setStories (stories: any) {
    console.log('setStories', stories, JSON.stringify(stories))
    localStorage.setItem('story', JSON.stringify(stories))
}
