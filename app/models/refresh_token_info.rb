class RefreshTokenInfo < ApplicationRecord
  EXPIRES_IN = 30.seconds
  has_one :refresh_token,
          class_name: 'Doorkeeper::AccessToken',
          foreign_key: :refresh_token_id,
          dependent: :destroy,
          inverse_of: :refresh_token_info

  def expired?
    Time.now.utc > created_at + EXPIRES_IN
  end
end
