class Company < ActiveRecord::Base
  has_many :artists
  translates :name
end
