class Card < ActiveRecord::Base
  belongs_to :album
  has_many :requests
  translates :name
end
