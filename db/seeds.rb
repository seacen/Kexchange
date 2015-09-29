# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Country.destroy_all
State.destroy_all
City.destroy_all

require 'rexml/document'
include REXML

xmlfile = File.new('db/LocList.xml')
xmldoc = Document.new(xmlfile)

xmldoc.elements.each('Location/CountryRegion') do |c|
  # p c.attributes['Code'].to_s
  dc = Country.create(name: c.attributes['Name'].to_s, code: c.attributes['Code'].to_s)

  c.elements.each do |s|
    ds = State.create(name: s.attributes['Name'].to_s, code: s.attributes['Code'].to_s, country: dc)

    if s.elements.first.nil?
      City.create(name: s.attributes['Name'].to_s, code: s.attributes['Code'].to_s, state: ds)
    else
      s.elements.each do |ct|
        City.create(name: ct.attributes['Name'].to_s, code: ct.attributes['Code'].to_s, state: ds)
      end
    end
  end
end

I18n.locale = 'zh-CN'
xmlfile = File.new('db/LocList.zh-CN.xml')
xmldoc = Document.new(xmlfile)
xmldoc.elements.each('Location/CountryRegion') do |c|
  # p c.attributes['Code'].to_s
  dc = Country.find_by(code: c.attributes['Code'].to_s)
  unless dc.blank?
    dc.update(name: c.attributes['Name'].to_s)

    c.elements.each do |s|
      ds = State.find_by(code: s.attributes['Code'].to_s, country: dc)
      unless ds.blank?
        ds.update(name: s.attributes['Name'].to_s)
        if s.elements.first.nil?
          dct = City.find_by(code: s.attributes['Code'].to_s, state: ds)
          dct.update(name: s.attributes['Name'].to_s) unless dct.blank?
        else
          s.elements.each do |ct|
            dct = City.find_by(code: ct.attributes['Code'].to_s, state: ds)
            dct.update(name: ct.attributes['Name'].to_s) unless dct.blank?
          end
        end
      end
    end
  end
end
