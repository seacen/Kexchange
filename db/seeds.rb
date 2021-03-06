# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Request.destroy_all
Card.destroy_all
Member.destroy_all
Album.destroy_all
Artist.destroy_all

rv = Artist.new
rv.attributes = { name: 'Red Velvet' }
rv.save

tr = Album.create(name: 'The Red', date: '2015-09-09', artist: rv, image: 'https://raw.githubusercontent.com/seacen/All-relevant/master/cover.jpg')
ic = Album.create(name: 'Ice Cream Cake', date: '2015-03-17', artist: rv)

%w(Irene Wendy Seulgi Joy Yeri).each do |name|
  rvm = Member.create(name: name, artist: rv)
  Card.create(member: rvm, album: tr)
  Card.create(member: rvm, album: ic)
end

Request.create(user: User.first, own: Card.last, want: Card.fourth, new_app: 3)
Request.create(user: User.first, own: Card.all[6], want: Card.fifth, new_app: 9)
Request.create(user: User.first, own: Card.all[-2], want: Card.second, new_app: 0)
Request.create(user: User.third, own: Card.last, want: Card.third, new_app: 9)

# User.all.each do |user1|
#   begin
#     user1.token = SecureRandom.urlsafe_base64
#   end while User.exists?(:token => user1.token)
#   user1.save
# end
