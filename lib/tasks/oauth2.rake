namespace :oauth2 do
  desc 'Creates oauth2 application for frontend application'
  task create_frontend_application: :environment do
    NAMES = [
      CLIENT_ID = 'OAUTH2_CLIENT_ID'.freeze,
      CLIENT_SECRET = 'OAUTH2_CLIENT_SECRET'.freeze
    ].freeze
    frontend_app = Doorkeeper::Application.find_or_create_by(
      name: 'frontend',
      redirect_uri: ENV.fetch('FRONTEND_OAUTH2_REDIRECT_URI')
    )
    path_to_env = Rails.root.join('client', ".env.#{Rails.env}.local")
    filtered_env = File.foreach(path_to_env).reject do |line|
      NAMES.any? { |name| line.include?(name) }
    end
    filtered_env << "#{CLIENT_ID}=#{frontend_app.uid}\n"
    filtered_env << "#{CLIENT_SECRET}=#{frontend_app.secret}\n"
    File.write(path_to_env, filtered_env.join)
  end
end
