# frozen_string_literal: true

FactoryBot.define do
  factory :word do
    title { FFaker::Lorem.characters(10) }
    dictionary
  end
end
