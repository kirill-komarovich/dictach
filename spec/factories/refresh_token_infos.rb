# frozen_string_literal: true

FactoryBot.define do
  factory :refresh_token_info do
    association :refresh_token, factory: :access_token
  end
end
