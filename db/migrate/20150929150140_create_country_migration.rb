class CreateCountryMigration < ActiveRecord::Migration
  def self.up
    Country.create_translation_table!({
      name: :string
    }, {
      :migrate_data => true
    })
  end

  def self.down
    Country.drop_translation_table! :migrate_data => true
  end
end
