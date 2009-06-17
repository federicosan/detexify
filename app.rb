require 'uri'
require 'open-uri'
require 'data-uri'
require 'json'
require 'sinatra'

load 'detexify.rb' 

classifier = Detexify::Classifier.new

get '/' do
  haml :classify
end

get '/train' do
  @tex = classifier.gimme_tex
  
  haml :train
end

get '/symbols' do
  @tex = open('commands.txt') do |f|
    f.readlines
  end
  haml :symbols
end

post '/train' do
  # TODO sanity check in command list
  uri = URI.parse params[:url]
  strokes = JSON params[:strokes]
  unless [URI::HTTP, URI::FTP, URI::Data].any? { |c| uri.is_a? c }
       halt 401, "Only HTTP, FTP or Data!"
  end
  io = uri.open
  
  classifier.train params[:tex], io, strokes
  halt 200
end

post '/classify' do
  uri = URI.parse params[:url]
  strokes = JSON params[:strokes]
  unless [URI::HTTP, URI::FTP, URI::Data].any? { |c| uri.is_a? c }
       halt 401, "Only HTTP, FTP or Data!"
  end
  io = uri.open
    
  hits = classifier.classify io, strokes
  
  # sende { :url => url, :hits => [{:latex => latex, :score => score }, {:latex => latex, :score => score } ]  }
  JSON :url => params[:url], :hits => hits
end

get '/image' do
  # open(MATHTRANURL % [params[:"D"] || 1.to_s, params[:tex] || "foo"].map { |p| URI::escape(p) }) do |f|
  #     content_type f.content_type || 'application/octet-stream'
  #     last_modified f.last_modified
  #     response['Content-Length'] = f.size
  #     halt f
  #   end
  redirect 'http://www.mathtran.org/cgi-bin/mathtran?D=%s;tex=%s' % [params[:"D"] || 1.to_s, params[:tex] || "foo"].map { |p| URI::escape(p) }
end
