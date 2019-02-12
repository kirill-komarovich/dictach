# frozen_string_literal: true

json.descriptions do
  json.array! word.descriptions do |description|
    json.id description.id
    json.body description.body
    json.part_of_speech description.part_of_speech
  end
end
