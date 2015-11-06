class Card < ActiveRecord::Base
  belongs_to :album
  belongs_to :member
  has_many :requests
end
