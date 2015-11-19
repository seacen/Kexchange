module SessionsHelper
  # Log a user in after authenticating, store in session
  def log_in(user, remember_status)
    if remember_status
      cookies.permanent[:token] = user.token
    else
      cookies[:token] = user.token
    end
    I18n.locale = user.locale unless user.locale.nil?
  end
  # Log out for a user
  def log_out
    cookies.delete(:token)
  end

  # Return the currently logged in user for this session
  def curr_user
    return @curr_user if @curr_user
    @curr_user = User.find_by(token: cookies[:token]) if cookies[:token]
  end
end
