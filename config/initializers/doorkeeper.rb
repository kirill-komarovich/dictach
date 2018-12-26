# frozen_string_literal: true

Doorkeeper.configure do
  Devise::Doorkeeper.configure_doorkeeper(self)
  # Change the ORM that doorkeeper will use (needs plugins)
  orm :active_record

  # This block will be called to check whether the resource owner is authenticated or not.
  resource_owner_authenticator do
    # raise "Please configure doorkeeper resource_owner_authenticator block located in #{__FILE__}"
    # Put your resource owner authentication logic here.
    # Example implementation:
    # User.find_by_id(session[:user_id]) || redirect_to(new_user_session_url)
  end

  resource_owner_from_credentials do |_routes|
    user = User.find_for_database_authentication(email: params[:email])

    user if user&.valid_for_authentication? { user.valid_password?(params[:password]) }
  end

  api_only

  # Authorization Code expiration time (default 10 minutes).
  #
  # authorization_code_expires_in 10.minutes

  # Access token expiration time (default 2 hours).
  # If you want to disable expiration, set this to nil.
  #
  # access_token_expires_in 2.hours

  # Use a custom class for generating the access token.
  # See https://github.com/doorkeeper-gem/doorkeeper#custom-access-token-generator
  #
  # access_token_generator '::Doorkeeper::JWT'

  use_refresh_token

  client_credentials :from_basic

  access_token_methods :from_bearer_authorization

  force_ssl_in_redirect_uri !Rails.env.development?

  force_ssl_in_redirect_uri { |uri| uri.host != 'localhost' }

  grant_flows %w[password]

  skip_authorization { true }
end
