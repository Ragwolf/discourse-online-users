/* global Ember */
import { h } from 'virtual-dom'
import { avatarImg } from 'discourse/widgets/post'

export default Ember.Object.create({
  render(widget) {
    this.widget = widget
    this.user = widget.state.user
    return this.container()
  },
  
  container() {
    return h('div.online-user-container', this.contents())
  },
  
  contents() {
    return [
      this.avatarWrapper(),
      this.username()
    ]
  },
  
  avatarWrapper() {
    return h('div.online-user-avatar', this.avatar())
  },
  
  avatar() {
    return avatarImg('small', {
      template: this.user.avatar_template,
      username: this.user.username
    })
  },
  
  username() {
    return h('div.online-user-username', this.user.username)
  }
})
