class ArtistsController < ApplicationController
    before_action :authenticate_user
    before_action :check_is_admin
    before_action :set_artist, only: [:show, :edit, :update, :destroy]

    def index
      @artists = Artist.order(:created_at)
      @artist = Artist.new
    end

    def new
      @artist = Artist.new
    end

    def create
      @artist = Artist.new(artist_params)
      respond_to do |format|
        if @artist.save
          format.html { redirect_to artists_path, notice: t('artist.new.success') }
          format.json { render :show, status: :created, location: @artist }
        else
          format.html { render :new, alert: @artist.errors }
          format.json { render json: @artist.errors, status: :unprocessable_entity }
        end
      end
    end

    def update
      respond_to do |format|
        if @artist.update(artist_params)
          format.html { redirect_to @artist, notice: t('artist.edit.success') }
          format.json { render :show, status: :ok, location: @artist }
        else
          format.html { render :edit }
          format.json { render json: @artist.errors, status: :unprocessable_entity }
        end
      end
    end

    private

    def set_artist
      @artist = Artist.find(params[:id])
    end

    def artist_params
      params.require(:artist).permit(:name)
    end
end
