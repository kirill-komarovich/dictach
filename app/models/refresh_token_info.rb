# frozen_string_literal: true

class RefreshTokenInfo < ApplicationRecord
  EXPIRES_IN = 30.days
  belongs_to :refresh_token, # rubocop:disable Rails/InverseOf
             class_name: 'Doorkeeper::AccessToken',
             foreign_key: :refresh_token_id,
             dependent: :destroy

  def expired?
    Time.now.utc > created_at + EXPIRES_IN
  end
end
