# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Sign in', type: :request do
  let!(:user) { create(:user) }

  context 'with valid creadentials' do
    let(:sign_in_params) do
      {
        user: {
          email: user.email,
          password: user.password
        }
      }
    end

    it 'authenticates user', :aggregate_failures do
      post user_session_path, params: sign_in_params

      expect(response.body).to eq user.reload.to_json
      expect(response).to have_http_status 201
    end
  end

  context 'with invalid creadentials' do
    let(:sign_in_params) do
      {
        user: {
          email: user.email,
          password: 'invalid-password'
        }
      }
    end

    it 'does not authenticate user', :aggregate_failures do
      post user_session_path, params: sign_in_params

      body = JSON.parse(response.body, symbolize_names: true)
      expect(body).to include(
        error: I18n.t(
          'devise.failure.invalid',
          authentication_keys: I18n.t('models.user.attributes.email').capitalize
        )
      )
      expect(response).to have_http_status 401
    end
  end
end
