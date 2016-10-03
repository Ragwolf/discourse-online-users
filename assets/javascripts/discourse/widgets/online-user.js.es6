import { createWidget } from 'discourse/widgets/widget'

import template from './templates/online-user'

export default createWidget('online-user', {
  tagName: 'li.online-user',
  
  buildAttributes() {
    const user = this.state.user
    
    return {
      'data-id': user.id,
      'data-username': user.username,
      'data-avatar-template': user.avatar_template
    }
  },
  
  defaultState(attrs) {
    return {
      user: attrs.user
    }
  },
  
  html() {
    return template.render(this)
  }
})
