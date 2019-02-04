# frozen_string_literal: true

json.array! @dictionaries do |dictionary|
  json.partial!('dictionary', dictionary: dictionary)
end
