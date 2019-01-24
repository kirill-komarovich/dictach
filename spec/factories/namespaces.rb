# frozen_string_literal: true

FactoryBot.define do
  factory :namespace do
    title { FFaker::Lorem.sentence }
    user
  end
end
