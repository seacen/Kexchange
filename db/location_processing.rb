require 'rexml/document'
include REXML

xmlfile = File.new('db/LocList.zh-CN.xml')
xmldoc = Document.new(xmlfile)

file = File.new('db/country.zh-CN.json','w')
file.write('[')
xmldoc.elements.each('Location/CountryRegion') do |c|
  file.write("[\"#{c.attributes['Name']}\",\"#{c.attributes['Code']}\"],")
end
file.write("[\"喜岑联合王国\",\"SCN\"]")
file.write(']')

# dropdown cities!!!!!!!!!!!!!!!!!
# file = File.new('db/city.zh-CN.json','w')
# file.write('{')
# i = 0
# xmldoc.elements.each('Location/CountryRegion') do |c|
#   file.write(',') if i != 0
#   file.write("\"#{c.attributes['Code']}\":{")
#   i += 1
#   if c.elements.first.nil?
#     file.write("\"#{c.attributes['Code']}\":[")
#     file.write("[\"#{c.attributes['Name']}\",\"#{c.attributes['Code']}\"]")
#     file.write(']')
#   else
#     z = 0
#     c.elements.each do |s|
#       file.write(',') if z != 0
#       if s.attributes['Code'].nil?
#         file.write("\"#{c.attributes['Code']}\":[")
#       else
#         file.write("\"#{s.attributes['Code']}\":[")
#       end
#       z += 1
#
#       if s.elements.first.nil?
#         file.write("[\"#{s.attributes['Name']}\",\"#{s.attributes['Code']}\"]")
#       else
#         x = 0
#         s.elements.each do |ct|
#           file.write(',') if x != 0
#           file.write("[\"#{ct.attributes['Name']}\",\"#{ct.attributes['Code']}\"]")
#           x += 1
#         end
#       end
#       file.write(']')
#     end
#   end
#   file.write('}')
# end
# file.write(",\"SCN\":{\"SSC\":[[\"泰妍区\",\"TYD\"]]}")
# file.write('}')

# dropdown state!!!!!!!!!!
# file = File.new('db/state.json','w')
# file.write('{')
# i = 0
# xmldoc.elements.each('Location/CountryRegion') do |c|
#   if i == 0
#     file.write("\"#{c.attributes['Code']}\":[")
#   else
#     file.write(",\"#{c.attributes['Code']}\":[")
#   end
#   i += 1
#   if c.elements.first.nil?
#     file.write("[\"#{c.attributes['Name']}\",\"#{c.attributes['Code']}\"]")
#   else
#     x = 0
#     c.elements.each do |s|
#       file.write(',') if x != 0
#       if s.attributes['Code'].nil?
#         file.write("[\"#{c.attributes['Name']}\",\"#{c.attributes['Code']}\"]")
#       else
#         file.write("[\"#{s.attributes['Name']}\",\"#{s.attributes['Code']}\"]")
#       end
#       x += 1
#     end
#   end
#   file.write(']')
# end
# file.write(",\"SCN\":[[\"Seacen Special City\",\"SSC\"]]")
# file.write('}')

# dropdown country!!!!!!!!!!
# file = File.new('db/country.txt','w')
# file.write('[')
# xmldoc.elements.each('Location/CountryRegion') do |c|
#   file.write("[t('#{c.attributes['Code']}.name'),'#{c.attributes['Code']}'],")
# end
# file.write("[t('SCN.name'),'SCN']")
# file.write(']')



# locale file!!!!!!!!!
# file = File.new('db/en.yml','w')
#
# file.write "en:\n"
#
# xmldoc.elements.each('Location/CountryRegion') do |c|
#   file.write "\s\s"
#   file.write ':' if c.attributes['Code'].to_i.to_s == c.attributes['Code']
#   file.write c.attributes['Code'].to_s+":\n"
#   file.write "\s\s\s\sname: \""+c.attributes['Name']+"\"\n"
#   if c.elements.first.nil?
#     file.write "\s\s\s\s"
#     file.write ':' if c.attributes['Code'].to_i.to_s == c.attributes['Code']
#     file.write c.attributes['Code']+":\n"
#     file.write "\s\s\s\s\s\sname: \""+c.attributes['Name']+"\"\n"
#     file.write "\s\s\s\s\s\s"
#     file.write ':' if c.attributes['Code'].to_i.to_s == c.attributes['Code']
#     file.write c.attributes['Code']+":\n"
#     file.write "\s\s\s\s\s\s\s\sname: \""+c.attributes['Name']+"\"\n"
#   else
#     c.elements.each do |s|
#       if s.attributes['Code'].nil?
#         file.write "\s\s\s\s"
#         file.write ':' if c.attributes['Code'].to_i.to_s == c.attributes['Code']
#         file.write c.attributes['Code']+":\n"
#         file.write "\s\s\s\s\s\sname: \""+c.attributes['Name']+"\"\n"
#       else
#         file.write "\s\s\s\s"
#         file.write ':' if s.attributes['Code'].to_i.to_s == s.attributes['Code']
#         file.write s.attributes['Code']+":\n"
#         file.write "\s\s\s\s\s\sname: \""+s.attributes['Name']+"\"\n"
#       end
#
#       if s.elements.first.nil?
#         file.write "\s\s\s\s\s\s"
#         file.write ':' if s.attributes['Code'].to_i.to_s == s.attributes['Code']
#         file.write s.attributes['Code']+":\n"
#         file.write "\s\s\s\s\s\s\s\sname: \""+s.attributes['Name']+"\"\n"
#       else
#         s.elements.each do |ct|
#           file.write "\s\s\s\s\s\s"
#           file.write ':' if ct.attributes['Code'].to_i.to_s == ct.attributes['Code']
#           file.write ct.attributes['Code']+":\n"
#           file.write "\s\s\s\s\s\s\s\sname: \""+ct.attributes['Name']+"\"\n"
#         end
#       end
#     end
#   end
# end
file.close
xmlfile.close


# database!!!

#   # p c.attributes['Code'].to_s
#   dc = Country.create(name: c.attributes['Name'].to_s, code: c.attributes['Code'].to_s)
#
#   c.elements.each do |s|
#     ds = State.create(name: s.attributes['Name'].to_s, code: s.attributes['Code'].to_s, country: dc)
#
#     if s.elements.first.nil?
#       City.create(name: s.attributes['Name'].to_s, code: s.attributes['Code'].to_s, state: ds)
#     else
#       s.elements.each do |ct|
#         City.create(name: ct.attributes['Name'].to_s, code: ct.attributes['Code'].to_s, state: ds)
#       end
#     end
#   end
# end
#
# I18n.locale = 'zh-CN'
# xmlfile = File.new('db/LocList.zh-CN.xml')
# xmldoc = Document.new(xmlfile)
# xmldoc.elements.each('Location/CountryRegion') do |c|
#   # p c.attributes['Code'].to_s
#   dc = Country.find_by(code: c.attributes['Code'].to_s)
#   unless dc.blank?
#     dc.update(name: c.attributes['Name'].to_s)
#
#     c.elements.each do |s|
#       ds = State.find_by(code: s.attributes['Code'].to_s, country: dc)
#       unless ds.blank?
#         ds.update(name: s.attributes['Name'].to_s)
#         if s.elements.first.nil?
#           dct = City.find_by(code: s.attributes['Code'].to_s, state: ds)
#           dct.update(name: s.attributes['Name'].to_s) unless dct.blank?
#         else
#           s.elements.each do |ct|
#             dct = City.find_by(code: ct.attributes['Code'].to_s, state: ds)
#             dct.update(name: ct.attributes['Name'].to_s) unless dct.blank?
#           end
#         end
#       end
#     end
#   end
# end
