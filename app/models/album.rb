class Album < ActiveRecord::Base
  belongs_to :artist
  has_many :cards

  validates :name, uniqueness: { scope: :artist }
end
