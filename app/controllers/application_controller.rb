class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_locale

  # Include our session helper
  include SessionsHelper

  def authenticate_user
    if !curr_user
      redirect_to login_path, alert: 'please login'
    end
  end

  # check if user has not been logined
  def check_unlogin
    if curr_user
      redirect_to curr_user
    end
  end

  private

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def default_url_options(options = {})
    { locale: I18n.locale }.merge options
  end
end
