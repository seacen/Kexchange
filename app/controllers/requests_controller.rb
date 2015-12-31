require 'active_support'
require 'active_support/core_ext/object/blank'

class RequestsController < ApplicationController
  before_action :authenticate_user
  before_action :set_request, only: [:show, :destroy]
  before_action :check_valid, only: [:destroy]

  def index
    @requests = curr_user.requests.order(created_at: :desc)
  end

  def new
    @artists = Artist.order(:created_at)
  end

  def new_album
    if params[:artist1].blank? || params[:artist2].blank?
      redirect_to new_request_path, alert: t('request.data_missing')
      return
    end
    @albums1 = Album.where(artist_id: params[:artist1]).order(created_at: :desc)
    @albums2 = Album.where(artist_id: params[:artist2]).order(created_at: :desc)
  end

  def new_card
    if params[:album1].blank? || params[:album2].blank?
      redirect_to new_request_path, alert: t('request.data_missing')
      return
    end
    @cards1 = Card.where(album_id: params[:album1])
    @cards2 = Card.where(album_id: params[:album2])
  end

  def create
    if params[:card1].blank? || params[:card2].blank?
      redirect_to new_request_path, alert: t('request.data_missing')
      return
    end
    @request = Request.new(user: curr_user, own_id: params[:card1], want_id: params[:card2], new_app: 0)
    # @user.city_id = user_params[:city].to_i
    respond_to do |format|
      if @request.save
        format.html { redirect_to requests_path, notice: t('request.new.success') }
        format.json { render :show, status: :created, location: @request }
      else
        @artists = Artist.all
        format.html { redirect_to new_request_path, alert: @request.errors.messages.values.join("\n") }
        format.json { render json: @reqeust.errors, status: :unprocessable_entity }
      end
    end
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

  def check_valid
    return if @request.user == curr_user
    redirect_to home_path, alert: t('user.unauthorized')
  end

  def request_params
    params.require(:request).permit(:artist)
  end

end
