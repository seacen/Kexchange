class Artist < ActiveRecord::Base
  belongs_to :company
  has_many :albums
end
