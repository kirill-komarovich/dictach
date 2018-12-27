# frozen_string_literal: true

FactoryBot.define do
  factory :access_token, class: Doorkeeper::AccessToken do
    resource_owner_id { create(:user).id }
    application { nil }
    expires_in { 2.hours }
    refresh_token { Doorkeeper::OAuth::Helpers::UniqueToken.generate }

    after :create do |access_token|
      create :refresh_token_info, refresh_token: access_token
    end

    trait :refreshed do
      previous_refresh_token { Doorkeeper::OAuth::Helpers::UniqueToken.generate }
    end
  end
end
