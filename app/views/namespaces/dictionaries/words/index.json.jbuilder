# frozen_string_literal: true

json.array! @words do |word|
  json.partial!('word', word: word)
end
