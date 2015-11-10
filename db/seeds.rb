# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Request.destroy_all
Card.destroy_all
Album.destroy_all
Artist.destroy_all
Company.destroy_all

sm = Company.new
sm.attributes = { name: 'SM娱乐', locale: 'zh-CN' }
sm.attributes = { name: 'S.M. Entertainment', locale: 'en' }
sm.save

rv = Artist.new
rv.attributes = { name: 'Red Velvet', company: sm }
rv.save

tr = Album.create(name: 'The Red', date: '2015-09-09', artist: rv, image: 'https://raw.githubusercontent.com/seacen/All-relevant/master/cover.jpg')
ic = Album.create(name: 'Ice Cream Cake', date: '2015-03-17', artist: rv)

%w(Irene Wendy Seulgi Joy Yeri).each do |name|
  rvm = Member.create(name: name)
  Card.create(member: rvm, album: tr)
  Card.create(member: rvm, album: ic)
end

Request.create(user: User.first, own: Card.second, want: Card.fourth)
Request.create(user: User.first, own: Card.fifth, want: Card.all[6])

# Card.create(name: 'Wendy', album: tr)
# Card.create(name: 'Irene', album: tr)
# Card.create(name: 'Seulgi', album: tr)
# Card.create(name: 'Joy', album: tr)
# Card.create(name: 'Yeri', album: tr)
