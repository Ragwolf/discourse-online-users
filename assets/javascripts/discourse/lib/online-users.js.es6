/* global Ember */
export default Ember.Object.create({
  setOnlineUsers(data) {
    this.set('onlineUsers', data.online_users)
    this.setOnlineUserCount()
    this.rerender()
  },
  
  getOnlineUsers() {
    return this.get('onlineUsers') || []
  },
  
  setOnlineUserCount() {
    this.set('onlineUserCount', this.getOnlineUsers().length)
  },
  
  getOnlineUserCount() {
    return this.get('onlineUserCount') || 0
  },
  
  rerender() {
    if (!this.get('header')) return
    this.get('header').queueRerender()
  }
})