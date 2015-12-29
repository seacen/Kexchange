class Card < ActiveRecord::Base
  belongs_to :album
  belongs_to :member
  has_many :requests

  validates_presence_of :album, :member
  validates :member, uniqueness: { scope: :album }
end
