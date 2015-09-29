class CreateCardTranslation < ActiveRecord::Migration
  def self.up
    Card.create_translation_table!({
      name: :string
    }, {
      :migrate_data => true
    })
  end

  def self.down
    Card.drop_translation_table! :migrate_data => true
  end
end
