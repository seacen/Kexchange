class Member < ActiveRecord::Base
  has_many :cards
  translates :name
end
