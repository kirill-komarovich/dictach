# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Doorkeeper refershing access token', type: :request do
  let!(:token) { create(:access_token) }

  let(:refresh_token_params) do
    {
      refresh_token: token.refresh_token,
      grant_type: 'refresh_token'
    }
  end

  it 'refreshes access token' do
    post oauth_token_path, params: refresh_token_params

    body = JSON.parse(response.body, symbolize_names: true)
    expect(body).to include :access_token, :refresh_token, :token_type, :expires_in, :created_at
    expect(response).to have_http_status 200
  end

  context 'when refresh token expired' do
    before do
      allow_any_instance_of(RefreshTokenInfo).to receive(:expired?).and_return(true)
    end

    it 'returns error' do
      post oauth_token_path, params: refresh_token_params

      body = JSON.parse(response.body, symbolize_names: true)
      expect(body).to include error: 'expired'
      expect(response).to have_http_status 401
    end
  end
end
