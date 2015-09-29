class CreateCityTranslation < ActiveRecord::Migration
  def self.up
    City.create_translation_table!({
      name: :string
    }, {
      :migrate_data => true
    })
  end

  def self.down
    City.drop_translation_table! :migrate_data => true
  end
end
