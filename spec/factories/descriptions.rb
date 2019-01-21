# frozen_string_literal: true

FactoryBot.define do
  factory :description do
    body { FFaker::Lorem.paragraph }
    word
  end
end
