class RequestsController < ApplicationController
  before_action :authenticate_user

  def index
    @user = curr_user
    @requests = @user.requests
  end
end
