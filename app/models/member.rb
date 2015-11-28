class Member < ActiveRecord::Base
  belongs_to :artist
  has_many :cards
  translates :name

  validates :name, uniqueness: { case_sensitive: false, scope: :artist }
end
