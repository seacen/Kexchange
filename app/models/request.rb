class Request < ActiveRecord::Base
  belongs_to :user
  belongs_to :own, class_name: 'Card', foreign_key: 'own_id'
  belongs_to :want, class_name: 'Card', foreign_key: 'want_id'
  has_many :applications

  validates :own_id, uniqueness: { scope: [:user_id, :want_id], message: I18n.t('simple_form.error_notification.') }
end
