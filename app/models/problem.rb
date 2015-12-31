class Problem < ActiveRecord::Base
  belongs_to :user
  has_many :responses

  # serialize :object, Hash

  before_create :setup_stuff

  validates_presence_of :user, :title, :body, :ptype
  validates :ptype, inclusion: { in: %w(problem suggestion) }

  def setup_stuff
    self.is_archived = false
    self.resolved = false
    true
  end
end
