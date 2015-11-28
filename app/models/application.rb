class Application < ActiveRecord::Base
  belongs_to :user
  belongs_to :request
  belongs_to :own_request, class_name: 'Request', foreign_key: 'own_request_id'

  validates :request, uniqueness: { scope: [:own_request, :user] }
end
