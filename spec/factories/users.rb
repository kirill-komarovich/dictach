# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { FFaker::Internet.safe_email }
    password { FFaker::Internet.password }
    password_confirmation { password }
  end
end
