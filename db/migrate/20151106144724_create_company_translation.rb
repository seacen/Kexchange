class CreateCompanyTranslation < ActiveRecord::Migration
  def self.up
    Company.create_translation_table!({
      :name => :string,
    }, {
      :migrate_data => true
    })
  end

  def self.down
    Company.drop_translation_table! :migrate_data => true
  end
end
