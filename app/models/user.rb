class User < ActiveRecord::Base
  has_many :requests
  belongs_to :city
  has_secure_password

  validates_presence_of :email, :username
  validates :email, format: { with: /(.+)@(.+).[a-z]{2,4}/, message: "%{value} is not a valid email" }
  validates :username, length: { minimum: 3 }
  validates :username, format: { with: /\w+/, message: "can only constitute alphbet characters and underscores" }
  validates :password, length: {minimum: 6 }, allow_blank: true
  validates :username, uniqueness: { message: "username is taken, please choose a different one" }
end
