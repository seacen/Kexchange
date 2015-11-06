# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Card.destroy_all
Album.destroy_all
Artist.destroy_all
Company.destroy_all
User.destroy_all

sm = Company.new
sm.attributes = { name: 'SM娱乐', locale: 'zh-CN' }
sm.attributes = { name: 'S.M. Entertainment', locale: 'en' }
sm.save

rv = Artist.new
rv.attributes = { name: 'Red Velvet', company: sm }
rv.save

tr = Album.create(name: 'The Red', date: '2015-09-09', artist: rv, image: 'https://raw.githubusercontent.com/seacen/All-relevant/master/cover.jpg')

%w(Irene Wendy Seulgi Joy Yeri).each do |name|
  rvm = Member.create(name: name)
  Card.create(member: rvm, album: tr)
end


# Card.create(name: 'Wendy', album: tr)
# Card.create(name: 'Irene', album: tr)
# Card.create(name: 'Seulgi', album: tr)
# Card.create(name: 'Joy', album: tr)
# Card.create(name: 'Yeri', album: tr)
