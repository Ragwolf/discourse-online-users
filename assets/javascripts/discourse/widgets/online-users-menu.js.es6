import { createWidget } from 'discourse/widgets/widget'

import template from '../widgets/templates/online-users-menu'

export default createWidget('online-users-menu', {
  tagName: 'li.online-users-menu',
  
  defaultState(attrs) {
    return {
      viewingOnlineUsers: attrs.viewingOnlineUsers,
      onlineUsers: attrs.onlineUsers
    }
  },
  
  toggleView() {
    this.state.viewingOnlineUsers = !this.state.viewingOnlineUsers
    this.sendWidgetAction('toggleOnlineUsers')
  },
  
  clickOutside() {
    this.sendWidgetAction('toggleOnlineUsers')
  },
  
  html() {
    return template.render(this)
  }
});
