# frozen_string_literal: true

FactoryBot.define do
  factory :description do
    body { FFaker::Lorem.paragraph }
    word
    part_of_speech do
      Description::PARTS_OF_SPEECH[language.to_sym].sample
    end
  end
end
