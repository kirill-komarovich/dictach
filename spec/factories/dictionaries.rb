# frozen_string_literal: true

FactoryBot.define do
  factory :dictionary do
    title { FFaker::Lorem.sentence }
    language { 'en' }
    namespace
  end
end
