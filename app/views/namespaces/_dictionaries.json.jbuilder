# frozen_string_literal: true

json.dictionaries do
  json.array! namespace.dictionaries do |dictionary|
    json.id dictionary.id
    json.title dictionary.title
  end
end
