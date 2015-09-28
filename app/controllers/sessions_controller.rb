class SessionsController < ApplicationController
  # Before actions to check paramters
  before_action :session_params, only: [:do_login]
  before_action :check_unlogin, only: [:index, :login]
  before_action :authenticate_user, only: [:logout]

  def do_login
    # Find a user with params
    user = User.find_by(username: @credentials[:username])
    if user && user.authenticate(@credentials[:password])
      # Save them in the session
      log_in user
      # Redirect to posts page
      redirect_to user
    else
      redirect_to login_path, alert: t('login_fail')
    end
  end

  # Log out the user in the session and redirect to the unauth thing
  def logout
  	log_out
  	redirect_to home_path
  end

  # Private controller methods
  private
  def session_params
    params.require(:credentials).permit(:password, :username)
    @credentials = params[:credentials]
  end

end
