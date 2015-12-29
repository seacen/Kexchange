class Request < ActiveRecord::Base
  belongs_to :user
  belongs_to :own, class_name: 'Card', foreign_key: 'own_id'
  belongs_to :want, class_name: 'Card', foreign_key: 'want_id'
  has_many :applications, dependent: :destroy

  validates_presence_of :user, :own, :want, :new_app
  validates :own, uniqueness: { scope: [:user, :want] }
end
