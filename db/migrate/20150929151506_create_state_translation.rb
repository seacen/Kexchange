class CreateStateTranslation < ActiveRecord::Migration
  def self.up
    State.create_translation_table!({
      name: :string
    }, {
      :migrate_data => true
    })
  end

  def self.down
    State.drop_translation_table! :migrate_data => true
  end
end
