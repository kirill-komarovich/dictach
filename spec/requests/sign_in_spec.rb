# frozen_string_literal: true

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

    it 'authenticates user', :aggregate_issues do
      post oauth_token_path, params: sign_in_params

      body = JSON.parse(response.body, symbolize_names: true)
      expect(body).to include :access_token, :refresh_token, :token_type, :expires_in, :created_at
      expect(response).to have_http_status 200
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

    it 'does not authenticate user', :aggregate_issues do
      post oauth_token_path, params: sign_in_params

      body = JSON.parse(response.body, symbolize_names: true)
      expect(body).to include(error: 'invalid_grant')
      expect(response).to have_http_status 401
    end
  end
end
