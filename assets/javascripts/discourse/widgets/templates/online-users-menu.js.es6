/* global Ember, I18n */
import { h } from 'virtual-dom'

export default Ember.Object.create({
  render(widget) {
    this.widget = widget
    this.onlineUsers = widget.state.onlineUsers
    
    return this.widget.attach('menu-panel', {
      contents: () => this.panel()
    })
  },
  
  panel() {
    return h('section.online-users', this.onlineUsersPanel())
  },
  
  onlineUsersPanel() {
    return [
      h('div.online-users-title-wrapper', h('h4.online-users-title', I18n.t('online_users.title'))),
      h('div.online-users-list-wrapper', h('ul.online-users-list', this.onlineUsersView()))
    ]
  },
  
  onlineUsersView() {
    return this.onlineUsers.map(user => this.widget.attach('online-user', { user }))
  }
})
