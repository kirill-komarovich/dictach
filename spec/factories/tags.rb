# frozen_string_literal: true

FactoryBot.define do
  factory :tag do
    title { FFaker::Lorem.sentence }
    user
  end
end
