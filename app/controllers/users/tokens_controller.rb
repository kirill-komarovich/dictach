# frozen_string_literal: true

module Users
  class TokensController < Doorkeeper::TokensController
    def create
      response = authorize_response
      update_refresh_token_info(response.token) if response.respond_to?(:token)
      headers.merge! response.headers
      self.response_body = response.body.to_json
      self.status = response.status
    rescue Doorkeeper::Errors::DoorkeeperError => e
      handle_token_exception e
    end

    private

    def update_refresh_token_info(new_token)
      if new_token.previous_refresh_token.present?
        refresh_current_token(new_token)
      else
        RefreshTokenInfo.create(refresh_token_id: new_token.id)
      end
    end

    def refresh_current_token(new_token)
      previous_token = Doorkeeper::AccessToken.find_by(
        refresh_token: new_token.previous_refresh_token
      )
      refresh_token_info = RefreshTokenInfo.find_by(refresh_token_id: previous_token.id)
      RefreshTokenInfo.transaction do
        refresh_token_info.update(refresh_token_id: new_token.id)
        previous_token.destroy
        refresh_token_info.destroy if refresh_token_info.expired?
      end
      raise Doorkeeper::Errors::TokenExpired.new(new_token), :expired if refresh_token_info.expired?
    end
  end
end
