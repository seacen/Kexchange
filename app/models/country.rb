class Country < ActiveRecord::Base
  has_many :states
  translates :name
end
