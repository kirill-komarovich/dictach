require 'rails_helper'

RSpec.describe 'Doorkeeper sign in', type: :request do
  let(:user) { create(:user) }

  context 'with valid creadentials' do
    let(:sign_in_params) do
      {
        email: user.email,
        password: user.password,
        grant_type: 'password'
      }
    end

    it 'authenticates user' do
      post oauth_token_path, params: sign_in_params

      body = JSON.parse(response.body, symbolize_names: true)
      expect(body).to include :access_token, :refresh_token, :token_type, :expires_in, :created_at
    end
  end

  context 'with invalid creadentials' do
    let(:sign_in_params) do
      {
        email: user.email,
        password: 'invalid-password',
        grant_type: 'password'
      }
    end

    it 'does not authenticate user' do
      post oauth_token_path, params: sign_in_params

      body = JSON.parse(response.body, symbolize_names: true)
      expect(body).to include(error: 'invalid_grant')
    end
  end
end
