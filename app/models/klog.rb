class Klog < ActiveRecord::Base
  belongs_to :user

  def self.log(kmodel, kaction, content, user)
    create(kmodel: kmodel, kaction: kaction, content: content, user: user)
  end
end
