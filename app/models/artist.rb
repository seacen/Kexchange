class Artist < ActiveRecord::Base
  has_many :albums
  has_many :members
  has_many :cards, through: :albums
  translates :name

  # after_create :create_group_member

  validates :name, uniqueness: { case_sensitive: false }

  # private
  #
  # def create_group_member
  #   group = Member.new(artist: self)
  #   group.attributes = { name: '团体', locale: 'zh-CN' }
  #   group.attributes = { name: 'group', locale: 'en' }
  #   group.save
  # end
end
