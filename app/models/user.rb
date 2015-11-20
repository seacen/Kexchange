class User < ActiveRecord::Base
  has_many :requests
  has_many :applications
  has_secure_password

  before_create :generate_token, :setup_confirmed, :setup_role

  validates_presence_of :email, :username, :city, :state, :country, :locale
  validates :email, format: { with: /(.+)@(.+).[a-z]{2,4}/, message: I18n.t('simple_form.error_notification.email.format') }
  validates :username, length: { minimum: 3 }
  validates :username, format: { with: /\A\w+\z/, message: I18n.t('simple_form.error_notification.username.format') }
  validates :password, length: { minimum: 6 }, allow_blank: true
  validates :username, uniqueness: { case_sensitive: false }
  validates :email, uniqueness: true
  validate :username_not_changed

  def generate_token
    begin
      self.token = SecureRandom.urlsafe_base64
    end while User.exists?(token: self.token)
  end

  def setup_role
    self.is_admin = false
    true
  end

  def setup_confirmed
    self.confirmed = false
    true
  end

  def username_not_changed
    return unless username_changed? && self.persisted?
    errors.add(:username, I18n.t('simple_form.error_notification.username.unchangeable'))
  end
end
