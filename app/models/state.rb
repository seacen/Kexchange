class State < ActiveRecord::Base
  belongs_to :country
  has_many :cities
  translates :name
end
