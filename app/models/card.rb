class Card < ActiveRecord::Base
  belongs_to :album
  has_many :requests
  has_many :claims
end
