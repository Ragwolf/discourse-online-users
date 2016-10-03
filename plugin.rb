# name: online-users
# about: A plugin to display who's currently online
# version: 0.1.0
# authors: Tom Connolly
# url: https://github.com/ragwolf/discourse-online-users

enabled_site_setting :online_users_enabled

ONLINE_USERS_PLUGIN_NAME ||= "online_users".freeze

register_asset 'stylesheets/online_users.scss'

after_initialize do
  require_dependency 'user'
  
  module ::OnlineUsers
    class Engine < ::Rails::Engine
      engine_name ONLINE_USERS_PLUGIN_NAME
      isolate_namespace OnlineUsers
    end
    
    def self.online_users
      User.where("last_seen_at >= ?", SiteSetting.online_users_active_timeago.minutes.ago)
          .order(:username)
    end
  end
  
  class OnlineUsers::OnlineUsersController < ::ApplicationController
    before_filter :ensure_logged_in
    
    def index
      render json: ::OnlineUsers.online_users
    end
  end
  
  OnlineUsers::Engine.routes.draw do
    get '/' => 'online_users#index'
  end
  
  Discourse::Application.routes.append do
    mount ::OnlineUsers::Engine, at: "/online_users"
  end
end
