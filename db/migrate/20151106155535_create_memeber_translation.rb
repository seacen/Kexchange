class CreateMemeberTranslation < ActiveRecord::Migration
  def self.up
    Member.create_translation_table!({
      :name => :string,
    }, {
      :migrate_data => true
    })
  end

  def self.down
    Member.drop_translation_table! :migrate_data => true
  end
end
