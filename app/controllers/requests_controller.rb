class RequestsController < ApplicationController
  before_action :authenticate_user
  before_action :set_request, only: [:show, :destroy]

  def index
    @requests = curr_user.requests
  end

  def new
  end

  def destroy
    @request.destroy
    respond_to do |format|
      format.html { redirect_to requests_path, notice: t('request.destroy.success') }
      format.json { head :no_content }
    end
  end

  private

  def set_request
    @request = Request.find(params[:id])
  end
end
