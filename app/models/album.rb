class Album < ActiveRecord::Base
  belongs_to :artist
  has_many :cards

  validates_presence_of :name, :date, :artist
  validates :name, uniqueness: { scope: :artist }
end
