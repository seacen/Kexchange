class User < ActiveRecord::Base
  has_many :requests
  has_many :applications
  has_secure_password

  validates_presence_of :email, :username, :city, :state, :country, :locale
  validates :email, format: { with: /(.+)@(.+).[a-z]{2,4}/, message: I18n.t('simple_form.error_notification.email.format') }
  validates :username, length: { minimum: 3 }
  validates :username, format: { with: /\A\w+\z/, message: I18n.t('simple_form.error_notification.username.format') }
  validates :password, length: {minimum: 6 }, allow_blank: true
  validates :username, uniqueness: true
  validates :email, uniqueness: true
  validate :username_not_changed

  def username_not_changed
    return unless username_changed? && self.persisted?
    errors.add(:username, I18n.t('simple_form.error_notification.username.unchangeable'))
  end
end
