# frozen_string_literal: true

FactoryBot.define do
  factory :word do
    title { FFaker::Lorem.word }
    dictionary
  end
end
