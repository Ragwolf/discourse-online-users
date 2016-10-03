import { withPluginApi } from 'discourse/lib/plugin-api'
import SiteHeader from 'discourse/components/site-header'
import { ajax } from 'discourse/lib/ajax'

import OnlineUsers from '../lib/online-users'
window.OnlineUsers = OnlineUsers

function initializePlugin(api) {
  const siteSettings = api.container.lookup('site-settings:main')
  const currentUser = api.container.lookup('current-user:main')
  
  if (!siteSettings.online_users_enabled || (siteSettings.online_users_requires_login && !currentUser)) return
  
  ajax('/online_users').then(
    data => OnlineUsers.setOnlineUsers(data),
    error => console.log(error)
  )
  
  SiteHeader.reopen({
    didInsertElement() {
      this._super()
      OnlineUsers.set('header', this)
    }
  })
  
  api.decorateWidget('header-icons:before', helper => {
    const headerState = helper.widget.parentWidget.state
    const contents = []
    
    contents.push(helper.attach('header-dropdown', {
      title: 'online_users.title',
      icon: 'users',
      iconId: 'online-users-icon',
      active: headerState.onlineUsersVisible,
      action: 'toggleOnlineUsers',
      contents() {
        return this.attach('link', {
          action: 'toggleOnlineUsers',
          className: 'badge-notification',
          rawLabel: OnlineUsers.getOnlineUserCount()
        })
      }
    }))
    
    if (headerState.onlineUsersVisible) {
      if (headerState.viewingOnlineUsers === undefined) {
        headerState.viewingOnlineUsers = true
      }
      contents.push(helper.attach('online-users-menu', {
        viewingOnlineUsers: headerState.viewingOnlineUsers,
        onlineUsers: OnlineUsers.getOnlineUsers()
      }))
    }
      
    return contents
  })
  
  api.attachWidgetAction('header', 'toggleOnlineUsers', function () {
    this.state.onlineUsersVisible = !this.state.onlineUsersVisible
  })
}

export default {
  name: 'enable-online-users',

  initialize() {
    withPluginApi('0.1', api => initializePlugin(api))
  }
}
