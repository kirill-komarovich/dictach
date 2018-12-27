# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::TokensController, type: :controller do
  let(:user) { create(:user) }

  describe '#create' do
    let(:sign_in_params) do
      {
        email: user.email,
        password: user.password,
        grant_type: 'password'
      }
    end

    it 'returns access token by email and password', :aggregate_failures do
      post :create, params: sign_in_params

      body = JSON.parse(response.body, symbolize_names: true)
      expect(body).to include :access_token, :refresh_token, :token_type, :expires_in, :created_at
      expect(response).to have_http_status 200
    end

    context 'with invalid email', :aggregate_failures do
      let(:user) { build(:user) }

      it 'returns error' do
        post :create, params: sign_in_params

        body = JSON.parse(response.body, symbolize_names: true)
        expect(body).to include error: 'invalid_grant'
        expect(response).to have_http_status 401
      end
    end

    context 'with invalid password', :aggregate_failures do
      let(:sign_in_params) do
        {
          email: user.email,
          password: 'invalid-password',
          grant_type: 'password'
        }
      end

      it 'returns error' do
        post :create, params: sign_in_params

        body = JSON.parse(response.body, symbolize_names: true)
        expect(body).to include error: 'invalid_grant'
        expect(response).to have_http_status 401
      end
    end

    context 'when refreshing access token', :aggregate_failures do
      let!(:token) { create(:access_token, resource_owner_id: user.id) }

      let(:refresh_token_params) do
        {
          refresh_token: token.refresh_token,
          grant_type: 'refresh_token'
        }
      end

      it 'returns new access token', :aggregate_failures do
        post :create, params: refresh_token_params

        body = JSON.parse(response.body, symbolize_names: true)
        expect(body).to include :access_token, :refresh_token, :token_type, :expires_in, :created_at
        expect(body).not_to include refresh_token: token.refresh_token
        expect(response).to have_http_status 200
      end

      context 'when refresh token expired', :aggregate_failures do
        let!(:token) { create(:access_token, :refreshed, resource_owner_id: user.id) }
        before do
          allow_any_instance_of(RefreshTokenInfo).to receive(:expired?).and_return(true)
        end

        it 'returns error' do
          post :create, params: refresh_token_params

          body = JSON.parse(response.body, symbolize_names: true)
          expect(body).to include error: 'expired'
          expect(response).to have_http_status 401
        end
      end
    end
  end
end
